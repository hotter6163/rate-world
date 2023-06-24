import { Resolvers } from '../generated/resolvers-types';
import { Mutation } from '../schema/base/resolvers/Mutation';
import { Query } from '../schema/base/resolvers/Query';

export const resolvers: Resolvers = {
  Query,
  Mutation,
};
