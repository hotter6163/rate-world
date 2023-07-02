import { QueryResolvers } from '@/libs/gql/generated/resolvers-types';

export const userQuery: QueryResolvers['user'] = (_, { id }, { dataSources: { user } }) =>
  user.findUnique({ where: { id } });
