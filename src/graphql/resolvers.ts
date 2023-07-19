import { Resolvers } from './generated/resolvers-types';
import { Mutation } from './schema/Mutation';
import { Query } from './schema/Query';
import { MatchingResult } from './schema/pusher';

export const resolvers: Resolvers = {
  Query,
  Mutation,

  MatchingResult,
};
