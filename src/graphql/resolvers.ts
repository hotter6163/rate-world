import { Resolvers } from './generated/resolvers-types';
import { Mutation } from './schema/Mutation';
import { Query } from './schema/Query';

export const resolvers: Resolvers = {
  Query,
  Mutation,
};
