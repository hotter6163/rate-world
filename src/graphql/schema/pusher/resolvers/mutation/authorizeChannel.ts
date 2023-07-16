import { Game } from '@/games/Game';
import { MutationResolvers } from '@/graphql/generated/resolvers-types';
import { setBattleLine } from '@/libs/kv';
import { Channel, splitChannelName } from '@/libs/pusher';
import { User } from '@prisma/client';
import { VercelKV } from '@vercel/kv';
import Pusher, { ChannelAuthResponse } from 'pusher';

export const authorizeChannelMutation: MutationResolvers['authorizeChannel'] = async (
  _,
  { input: { socketId, channelName } },
  { token, dataSources, pusher, kv },
) => {
  if (!token) return { data: null, status: 403 };

  const session = await dataSources.session.findUnique({
    where: { sessionToken: token },
    include: { user: { select: { id: true, name: true, image: true } } },
  });
  if (!session) return { data: null, status: 403 };

  let channel: Channel;
  try {
    channel = splitChannelName(channelName);
  } catch {
    return { data: null, status: 403 };
  }

  switch (channel.prefix) {
    case 'private':
      return matchingHandler({
        pusher,
        socketId,
        channel: channelName,
        game: channel.game,
        user: session.user,
        kv,
      });
    case 'presence':
      return { data: null, status: 403 };
  }
};

const matchingHandler = async ({
  pusher,
  socketId,
  channel,
  game,
  user,
  kv,
}: {
  pusher: Pusher;
  socketId: string;
  channel: string;
  game: Game;
  user: Pick<User, 'id' | 'name' | 'image'>;
  kv: VercelKV;
}) => {
  let response: ChannelAuthResponse;
  try {
    response = pusher.authorizeChannel(socketId, channel);
  } catch {
    return { data: null, status: 403 };
  }

  switch (game) {
    case Game.BattleLine:
      await setBattleLine(kv, user);
      break;
  }

  return {
    data: {
      auth: response.auth,
      channelData: response.channel_data ?? null,
      sharedSecret: response.shared_secret ?? null,
    },
    status: 200,
  };
};
