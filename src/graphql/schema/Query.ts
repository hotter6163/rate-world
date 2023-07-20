import { userQuery, usersQuery } from './user';
import { Game } from '@/games/Game';
import { QueryResolvers, UserData } from '@/graphql/generated/resolvers-types';

export const Query: QueryResolvers = {
  user: userQuery,
  users: usersQuery,
  test: async (_, __, { kv, pusher }) => {
    const data = await kv.lrange<UserData>(Game.BattleLine, 0, -1);
    const res = await pusher.sendToUser('cljjjz5c00000y1kowu2zcbl2', 'matched', {
      roomId: 'roomId',
    });
    return data;
  },
};
