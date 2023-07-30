import { userQuery, usersQuery } from './user';
import { QueryResolvers, UserData } from '@/graphql/generated/resolvers-types';
import { Game } from '@prisma/client';

export const Query: QueryResolvers = {
  user: userQuery,
  users: usersQuery,
  test: async (_, __, { kv, pusher }) => {
    const data = await kv.lrange<UserData>(Game.BATTLE_LINE, 0, -1);
    const res = await pusher.sendToUser('cljjjz5c00000y1kowu2zcbl2', 'matched', {
      roomId: 'roomId',
    });
    return data;
  },
};
