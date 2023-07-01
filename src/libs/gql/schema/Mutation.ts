import { MutationResolvers } from '@/libs/gql/generated/resolvers-types';
import { createUserMutation } from '@/libs/gql/schema/user/resolvers/mutation/createUser';

export const Mutation: MutationResolvers = {
  createUser: createUserMutation,
};
