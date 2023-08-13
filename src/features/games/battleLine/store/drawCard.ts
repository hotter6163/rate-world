import { BattleLineStore } from '.';
import { ZustandSet } from '@/libs/zustand';

export const drawCard =
  (set: ZustandSet<BattleLineStore>): BattleLineStore['drawCard'] =>
  (cardType) =>
    set((state) => {
      if (state.myHands.length === 7) throw new Error('myHands is full');
      switch (cardType) {
        case 'UNIT':
          if (state.unitStack.length === 0) throw new Error('unitStack is empty');
          const [unitCard, ...newUnitStack] = [...state.unitStack];
          return {
            myHands: [...state.myHands, unitCard],
            unitStack: newUnitStack,
          };
        case 'TACTICAL':
          if (state.tacticalStack.length === 0) throw new Error('tacticalStack is empty');
          const [tacticalCard, ...newTacticalStack] = [...state.tacticalStack];
          return {
            myHands: [...state.myHands, tacticalCard],
            tacticalStack: newTacticalStack,
          };
      }
    });