import { Game, User } from '@prisma/client';
import { VercelKV } from '@vercel/kv';

export interface BattleLineStoreItem {
  user: Pick<User, 'id' | 'name' | 'image'>;
  timeoutAt: Date;
  rate: number;
}

export const setBattleLine = async (kv: VercelKV, ...data: BattleLineStoreItem[]) => {
  const store = await kv.lrange<BattleLineStoreItem>(Game.BATTLE_LINE, 0, -1);
  const existed = store.filter((row) => data.map(({ user: { id } }) => id).includes(row.user.id));
  await Promise.all(existed.map((row) => kv.lrem(Game.BATTLE_LINE, 1, row)));

  return kv.lpush<BattleLineStoreItem>(Game.BATTLE_LINE, ...data);
};
