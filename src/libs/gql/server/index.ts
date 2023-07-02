import typeDefs from '../generated/schema.graphql';
import { Context, context } from './context';
import { resolvers } from './resolvers';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextApiRequest } from 'next';

const server = new ApolloServer<Context>({
  resolvers,
  typeDefs,
});

export const apolloServer = startServerAndCreateNextHandler<NextApiRequest, Context>(server, {
  context,
});
