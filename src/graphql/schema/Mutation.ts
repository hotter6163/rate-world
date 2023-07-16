import { authenticateUserMutation, authorizeChannelMutation, callEventMutation } from './pusher';
import { MutationResolvers } from '@/graphql/generated/resolvers-types';

export const Mutation: MutationResolvers = {
  authenticateUser: authenticateUserMutation,
  authorizeChannel: authorizeChannelMutation,
  callEvent: callEventMutation,
};