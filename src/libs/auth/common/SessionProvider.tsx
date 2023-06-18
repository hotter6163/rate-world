'use client';

import { Session } from 'next-auth';
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { FC, ReactNode } from 'react';

interface Props {
  session: Session | null;
  children: ReactNode;
}

export const SessionProvider: FC<Props> = ({ session, children }) => (
  <NextAuthSessionProvider session={session}>{children}</NextAuthSessionProvider>
);
