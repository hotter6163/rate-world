import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  ssrMode: true,
  uri: process.env.NEXT_PUBLIC_API_URI,
  cache: new InMemoryCache(),
});
