import { prismaClient } from '@/libs/prisma/client';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest } from 'next';

export interface Context {
  req: NextApiRequest;
  dataSources: PrismaClient;
}

export const context = (req: NextApiRequest): Promise<Context> =>
  Promise.resolve({
    req,
    dataSources: prismaClient,
  });
