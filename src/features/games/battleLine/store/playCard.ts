import { BattleLineStore } from '.';
import { ZustandSet } from '@/libs/zustand';

export const playCard =
  (set: ZustandSet<BattleLineStore>): BattleLineStore['playCard'] =>
  (index) => {
    if (index === undefined) throw new Error('index is undefined');
    if (index < 0 || index > 8) throw new Error('index out of range');
    return set((state) => {
      if (state.selectedIndex === null) throw new Error('no card selected');
      const card = { ...state.myHands[state.selectedIndex] };
      const newBattlefields = state.battlefields.map((b, i) =>
        i === index ? { ...b, myFormation: [...b.myFormation, card] } : { ...b },
      );
      const newHands = state.myHands.filter((c) => c.id !== card.id);
      return {
        battlefields: newBattlefields,
        myHands: newHands,
        selectedIndex: null,
      };
    });
  };
