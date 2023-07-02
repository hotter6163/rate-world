import { userQuery, usersQuery } from './user';
import { QueryResolvers } from '@/libs/gql/generated/resolvers-types';

export const Query: QueryResolvers = {
  user: userQuery,
  users: usersQuery,
};
