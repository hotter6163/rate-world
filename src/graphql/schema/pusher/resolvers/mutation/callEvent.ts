import { MutationResolvers } from '@/graphql/generated/resolvers-types';

export const callEventMutation: MutationResolvers['callEvent'] = async (
  _,
  { input: { socketId, channelName, event, data } },
  { token, pusher },
) => {
  if (!token) return { success: false, message: 'Unauthorized' };

  pusher.trigger(
    channelName,
    event,
    data?.reduce((pre, { key, value }) => ({ ...pre, [key]: value }), {}),
    { socket_id: socketId ?? undefined },
  );

  return { success: true };
};
