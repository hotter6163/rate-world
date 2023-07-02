import { QueryResolvers } from '@/libs/gql/generated/resolvers-types';

export const usersQuery: QueryResolvers['users'] = (_, __, { dataSources: { user } }) =>
  user.findMany();
