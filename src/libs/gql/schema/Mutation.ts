import { createUserMutation } from './user';
import { MutationResolvers } from '@/libs/gql/generated/resolvers-types';

export const Mutation: MutationResolvers = {
  createUser: createUserMutation,
};
