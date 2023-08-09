import { BattleLineStore } from '.';
import { ZustandSet } from '@/libs/zustand';

export const selectHand =
  (set: ZustandSet<BattleLineStore>): BattleLineStore['selectHand'] =>
  (index) => {
    if (index < 0 || index > 6) throw new Error('index out of range');
    return set(() => ({
      selectedIndex: index,
    }));
  };
