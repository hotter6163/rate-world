import { QueryResolvers } from '@/libs/gql/generated/resolvers-types';
import { userQuery } from '@/libs/gql/schema/user/resolvers/query/user';

export const Query: QueryResolvers = {
  user: userQuery,
};
