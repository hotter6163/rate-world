import { Game } from '@/games/Game';
import { User } from '@prisma/client';
import { VercelKV } from '@vercel/kv';

export interface BattleLineStoreItem {
  user: Pick<User, 'id' | 'name' | 'image'>;
  timeoutAt: Date;
  rate: number;
}

export const setBattleLine = (kv: VercelKV, ...data: BattleLineStoreItem[]) =>
  kv.lpush<BattleLineStoreItem>(Game.BattleLine, ...data);
