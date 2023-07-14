import { userQuery, usersQuery } from './user';
import { QueryResolvers } from '@/graphql/generated/resolvers-types';

export const Query: QueryResolvers = {
  user: userQuery,
  users: usersQuery,
};
