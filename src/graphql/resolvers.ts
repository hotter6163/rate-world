import { Resolvers } from './generated/resolvers-types';
import { Mutation } from './schema/Mutation';
import { Query } from './schema/Query';
import { CreateMatchingResult } from './schema/pusher';

export const resolvers: Resolvers = {
  Query,
  Mutation,

  CreateMatchingResult,
};
