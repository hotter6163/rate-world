import { MutationResolvers } from '@/graphql/generated/resolvers-types';
import { setBattleLine } from '@/libs/kv';
import { Channel, splitChannelName } from '@/libs/pusher';
import { Game, PrismaClient, User } from '@prisma/client';
import { VercelKV } from '@vercel/kv';
import dayjs from 'dayjs';
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
      return presenceHandler({
        pusher,
        dataSources,
        arenaId: channel.id,
        participantId: session.user.id,
        socketId,
        channel: channelName,
      });
  }
};

const TIMEOUT_S = 90;

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
    case Game.BATTLE_LINE:
      await setBattleLine(kv, {
        user,
        timeoutAt: dayjs().add(TIMEOUT_S, 'seconds').toDate(),
        rate: 0,
      });
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

const presenceHandler = async ({
  pusher,
  dataSources: { arenaParticipant },
  arenaId,
  participantId,
  socketId,
  channel,
}: {
  pusher: Pusher;
  dataSources: PrismaClient;
  arenaId: string;
  participantId: string;
  socketId: string;
  channel: string;
}) => {
  const data = await arenaParticipant
    .findUnique({
      where: { arenaId_participantId: { arenaId, participantId } },
      select: {
        matchRating: true,
        matchResult: true,
        participant: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    })
    .then((data) =>
      !!data && !data.matchResult
        ? {
            ...data,
            participant: {
              user_id: data.participant.id,
              user_info: {
                name: data.participant.id,
                image: data.participant.image,
              },
            },
          }
        : null,
    );

  if (!data) return { data: null, status: 403 };

  let response: ChannelAuthResponse;
  try {
    response = pusher.authorizeChannel(socketId, channel, data.participant);
  } catch (e) {
    return { data: null, status: 403 };
  }

  await arenaParticipant.update({
    where: { arenaId_participantId: { arenaId, participantId } },
    data: { participatedAt: new Date() },
  });

  return {
    data: {
      auth: response.auth,
      channelData: response.channel_data ?? null,
      sharedSecret: response.shared_secret ?? null,
    },
    status: 200,
  };
};
