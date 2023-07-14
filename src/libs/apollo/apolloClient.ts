import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = () =>
  new ApolloClient({
    ssrMode: typeof window === 'undefined',
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
    cache: new InMemoryCache(),
    connectToDevTools: process.env.NODE_ENV === 'development',
  });
