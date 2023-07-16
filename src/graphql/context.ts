import prisma from '@/libs/prisma';
import pusher from '@/libs/pusher';
import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';
import Pusher from 'pusher';

export interface Context {
  req: NextRequest;
  token: string | null;
  dataSources: PrismaClient;
  pusher: Pusher;
}

export const context = (req: NextRequest): Promise<Context> =>
  Promise.resolve({
    req,
    token: req.cookies.get('next-auth.session-token')?.value ?? null,
    dataSources: prisma,
    pusher,
  });
