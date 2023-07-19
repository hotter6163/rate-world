import { MatchingResultType, MutationResolvers } from '@/graphql/generated/resolvers-types';
import { BattleLineStoreItem } from '@/libs/kv';
import { getChannelName, splitChannelName } from '@/libs/pusher';
import dayjs from 'dayjs';

export const matchingMutation: MutationResolvers['matching'] = async (
  _,
  { input: { channelName } },
  { token, dataSources: { session }, kv, pusher },
) => {
  if (!token) return { result: null, status: 400 };
  const channel = splitChannelName(channelName);
  if (channel.prefix !== 'private') return { result: null, status: 400 };

  const [matchingData, userId] = await Promise.all([
    kv.lrange<BattleLineStoreItem>(channel.game, 0, -1),
    session
      .findUnique({ select: { userId: true }, where: { sessionToken: token } })
      .then((session) => session?.userId),
  ]);
  if (!userId) return { result: null, status: 400 };
  const user = matchingData.find((item) => item.user.id === userId);
  if (!user) return { result: null, status: 400 };

  const opponents = matchingData.filter((item) => item.user.id !== userId);
  if (opponents.length === 0) {
    const isTimeout = dayjs().isAfter(user.timeoutAt);
    if (isTimeout) {
      await kv.lrem(channel.game, 0, user);
      return { result: { type: MatchingResultType.Timeout }, status: 200 };
    } else {
      return { result: { type: MatchingResultType.Retry }, status: 200 };
    }
  }

  const opponent = opponents[Math.floor(Math.random() * opponents.length)];
  const roomId = getChannelName({ prefix: 'presence', game: channel.game, id: 'roomId' });
  await Promise.all([
    kv.lrem(channel.game, 0, user),
    kv.lrem(channel.game, 0, opponent),
    pusher.sendToUser(opponent.user.id, 'matched', { roomId }),
  ]);
  return {
    result: { type: MatchingResultType.Success, roomId },
    status: 200,
  };
};
