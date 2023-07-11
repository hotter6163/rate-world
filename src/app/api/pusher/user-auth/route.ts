import prisma from '@/libs/prisma';
import { initializePusher } from '@/libs/pusher/server/initialize';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Pusher from 'pusher';

export const POST = async (req: NextRequest) => {
  const sessionToken = cookies().get('next-auth.session-token')?.value;
  if (!sessionToken) return new ForbiddenResponse('Session token is not found');

  const [socketId, userData] = await Promise.all([
    req.formData().then((data) => data.get('socket_id')),
    fetchUserData(sessionToken),
  ]);

  if (typeof socketId !== 'string') return new ForbiddenResponse('Socket ID is not found');
  if (!userData) return new ForbiddenResponse('Invalid session token');

  const authResponse = initializePusher().authenticateUser(socketId, userData);

  return NextResponse.json(authResponse);
};

const fetchUserData = (sessionToken: string): Promise<Pusher.UserChannelData | null> =>
  prisma.session
    .findFirst({
      select: { user: { select: { id: true, name: true } } },
      where: { sessionToken },
    })
    .then((session) =>
      session ? { id: session.user.id, user_info: { name: session.user.name ?? 'unknown' } } : null,
    );

class ForbiddenResponse extends NextResponse {
  constructor(errorMessage: string) {
    super(`Forbidden: ${errorMessage}`, { status: 403 });
  }
}
