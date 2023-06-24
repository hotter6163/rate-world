import { resolvers } from '../schema/resolvers.generated';
import { typeDefs } from '../schema/typeDefs.generated';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';

const server = new ApolloServer<{}>({
  resolvers,
  typeDefs,
});

export const apolloServer = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});