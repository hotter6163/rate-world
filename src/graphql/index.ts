import { Context, context } from './context';
import typeDefs from './generated/schema.graphql';
import { resolvers } from './resolvers';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';

const server = new ApolloServer<Context>({
  resolvers,
  typeDefs,
});

export const apolloServer = startServerAndCreateNextHandler<NextRequest, Context>(server, {
  context,
});