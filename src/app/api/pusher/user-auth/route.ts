import prisma from '@/libs/prisma';
import { initializePusher } from '@/libs/pusher/server/initialize';
import { NextRequest, NextResponse } from 'next/server';
import Pusher from 'pusher';

export const POST = async (req: NextRequest) => {
  const socketId = await req.formData().then((data) => data.get('socket_id'));
  console.log(socketId);
  if (typeof socketId !== 'string') throw new Error('Socket ID is not valid type');

  let userData;
  try {
    userData = await fetchUserData();
  } catch {
    return new NextResponse('User is not found', {
      status: 403,
    });
  }

  const authResponse = initializePusher().authenticateUser(socketId, userData);

  return NextResponse.json(authResponse);
};

const fetchUserData = (): Promise<Pusher.UserChannelData> =>
  prisma.user
    .findFirst({
      select: {
        id: true,
        name: true,
      },
    })
    .then((user) => {
      if (!user) throw new Error('User is not found');

      return {
        id: user.id,
        user_info: {
          name: user.name ?? 'unknown',
        },
      };
    });
