import { prismaClient } from '@/libs/prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { AuthOptions } from 'next-auth';
import LineProvider from 'next-auth/providers/line';

export const authOptions: AuthOptions = {
  providers: [
    LineProvider({
      clientId: process.env.LINE_CLIENT_ID ?? '',
      clientSecret: process.env.LINE_CLIENT_SECRET ?? '',
    }),
  ],
  adapter: PrismaAdapter(prismaClient),
};
