import { createUserMutation } from './user/resolvers/mutation/createUser';
import { MutationResolvers } from '@/libs/gql/generated/resolvers-types';

export const Mutation: MutationResolvers = {
  createUser: createUserMutation,
};
