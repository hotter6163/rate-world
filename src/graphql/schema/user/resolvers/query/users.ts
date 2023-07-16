import { QueryResolvers } from '@/graphql/generated/resolvers-types';

export const usersQuery: QueryResolvers['users'] = (_, __, { dataSources: { user } }) =>
  user.findMany();
