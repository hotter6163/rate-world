import { MutationResolvers } from '@/graphql/generated/resolvers-types';

export const callEventMutation: MutationResolvers['callEvent'] = async (
  _,
  { input: { socketId, channel, event, data } },
  { token, pusher },
) => {
  if (!token) return { success: false, message: 'Unauthorized' };
  console.log('callEventMutation', { socketId, channel, event, data });

  pusher.trigger(
    channel,
    event,
    data?.reduce((pre, { key, value }) => ({ ...pre, [key]: value }), {}),
    { socket_id: socketId ?? undefined },
  );

  return { success: true };
};
