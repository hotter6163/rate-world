import { MutationResolvers } from '@/libs/gql/generated/resolvers-types';

export const authenticateUserMutation: MutationResolvers['authenticateUser'] = async (
  _,
  { input: { socketId } },
  { token, dataSources: { session }, pusher },
) => {
  if (!token) return { data: null, status: 403 };

  const user = await session
    .findUnique({
      select: { user: { select: { id: true, name: true } } },
      where: { sessionToken: token },
    })
    .then((session) =>
      session ? { id: session.user.id, user_info: { name: session.user.name ?? 'unknown' } } : null,
    );
  if (!user) return { data: null, status: 403 };

  try {
    const { auth, user_data: userData } = pusher.authenticateUser(socketId, user);
    return { data: { auth, userData }, status: 200 };
  } catch {
    return { data: null, status: 403 };
  }
};
