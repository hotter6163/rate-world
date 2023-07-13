import { authenticateUserMutation } from './pusher';
import { authorizeChannelMutation } from './pusher/resolvers/mutation/authorizeChannel';
import { MutationResolvers } from '@/libs/gql/generated/resolvers-types';

export const Mutation: MutationResolvers = {
  authenticateUser: authenticateUserMutation,
  authorizeChannel: authorizeChannelMutation,
};
