'use client';

import { apolloClient } from './apolloClient';
import { ApolloProvider as _ApolloProvider } from '@apollo/client';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const ApolloProvider: FC<Props> = ({ children }) => (
  <_ApolloProvider client={apolloClient()}>{children}</_ApolloProvider>
);
