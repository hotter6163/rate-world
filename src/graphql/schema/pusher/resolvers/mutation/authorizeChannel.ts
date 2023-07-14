import { MutationResolvers } from '@/graphql/generated/resolvers-types';
import Pusher from 'pusher';

export const authorizeChannelMutation: MutationResolvers['authorizeChannel'] = async (
  _,
  { input: { socketId, channelName } },
  { token, dataSources: { session }, pusher },
) => {
  if (!token) return { data: null, status: 403 };

  const [prefix, game, id] = channelName.split('-');
  switch (prefix) {
    case 'private':
      if (id === 'matching') return matchingHandler(pusher, socketId, channelName);
      else return { data: null, status: 403 };
    case 'presence':
      return { data: null, status: 403 };
    default:
      return { data: null, status: 403 };
  }
};

const matchingHandler = (pusher: Pusher, socketId: string, channel: string) => {
  try {
    const { auth, channel_data, shared_secret } = pusher.authorizeChannel(socketId, channel);
    return {
      data: { auth, channelData: channel_data ?? null, sharedSecret: shared_secret ?? null },
      status: 200,
    };
  } catch {
    return { data: null, status: 403 };
  }
};
