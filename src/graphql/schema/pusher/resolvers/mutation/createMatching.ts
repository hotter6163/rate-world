import { CreateMatchingResultType, MutationResolvers } from '@/graphql/generated/resolvers-types';
import { BattleLineStoreItem } from '@/libs/kv';
import { getChannelName, splitChannelName } from '@/libs/pusher';
import { ArenaStatus, Game } from '@prisma/client';
import dayjs from 'dayjs';

export const createMatchingMutation: MutationResolvers['createMatching'] = async (
  _,
  { input: { channelName } },
  { token, dataSources: { session, arena }, kv, pusher },
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

  const opponents = matchingData.filter(
    (item) => item.user.id !== userId && dayjs().isBefore(item.timeoutAt),
  );
  if (opponents.length === 0) {
    const isTimeout = dayjs().isAfter(user.timeoutAt);
    if (isTimeout) {
      await kv.lrem(channel.game, 0, user);
      return { result: { type: CreateMatchingResultType.Timeout }, status: 200 };
    } else {
      return { result: { type: CreateMatchingResultType.Retry }, status: 200 };
    }
  }

  const opponent = opponents[Math.floor(Math.random() * opponents.length)];
  const arenaId = await Promise.allSettled([
    arena
      .create({
        data: {
          game: Game.BATTLE_LINE,
          status: ArenaStatus.MATCHING,
          participants: {
            create: [
              {
                participantId: user.user.id,
                matchRating: user.rate,
              },
              {
                participantId: opponent.user.id,
                matchRating: opponent.rate,
              },
            ],
          },
        },
      })
      .then((result) => result.id),
    kv.lrem(channel.game, 0, user),
    kv.lrem(channel.game, 0, opponent),
  ]).then((result) => {
    if (result[0].status === 'rejected') {
      return Promise.all([
        new Promise((resolve) =>
          result[1].status === 'fulfilled' ? kv.lpush(channel.game, user) : resolve(-1),
        ),
        new Promise((resolve) =>
          result[2].status === 'fulfilled' ? kv.lpush(channel.game, opponent) : resolve(-1),
        ),
      ]).then(() => null);
    } else {
      return result[0].value;
    }
  });

  if (!arenaId) return { result: null, status: 400 };
  const roomId = getChannelName({ prefix: 'presence', game: channel.game, id: arenaId });
  await pusher.sendToUser(opponent.user.id, 'matched', { roomId });
  return {
    result: { type: CreateMatchingResultType.Success, roomId },
    status: 200,
  };
};
