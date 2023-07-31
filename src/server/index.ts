import { Context, context } from './context';
import { schema } from './schema';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';

const server = new ApolloServer<Context>({
  schema,
});

export const apolloServer = startServerAndCreateNextHandler<NextRequest, Context>(server, {
  context,
});
