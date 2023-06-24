import { userQuery } from '../../user/resolvers/Query/user';
import { QueryResolvers } from '@/libs/gql/generated/resolvers-types';

export const Query: QueryResolvers = {
  user: userQuery,
};
