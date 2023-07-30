import { builder } from './builder';
import { Context, context } from './context';
import './schema/pusher';
import './types/giraffe';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';

const schema = builder.toSchema();

const server = new ApolloServer<Context>({
  schema,
});

export const apolloServer = startServerAndCreateNextHandler<NextRequest, Context>(server, {
  context,
});
