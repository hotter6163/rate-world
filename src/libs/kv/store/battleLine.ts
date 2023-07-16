import { Game } from '@/games/Game';
import { User } from '@prisma/client';
import { VercelKV } from '@vercel/kv';

export interface BattleLineStoreItem extends Pick<User, 'id' | 'name' | 'image'> {}

export const setBattleLine = (kv: VercelKV, ...data: BattleLineStoreItem[]) =>
  kv.lpush<BattleLineStoreItem>(Game.BattleLine, ...data);
