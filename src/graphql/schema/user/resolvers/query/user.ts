import { QueryResolvers } from '@/graphql/generated/resolvers-types';

export const userQuery: QueryResolvers['user'] = (_, { id }, { dataSources: { user } }) =>
  user.findUnique({ where: { id } });
