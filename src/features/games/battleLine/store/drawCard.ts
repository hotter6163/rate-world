import { BattleLineStore } from '.';
import { isExpectedTurn } from './utils/isExpectedTurn';
import { ZustandSet } from '@/libs/zustand';

export const drawCard =
  (set: ZustandSet<BattleLineStore>): BattleLineStore['drawCard'] =>
  (cardType) =>
    set((state) => {
      if (state.myHands.length === 7) throw new Error('myHands is full');
      if (!isExpectedTurn(state.turn, { type: 'drawCard', player: 'myself' }))
        throw new Error('Invalid turn type');

      switch (cardType) {
        case 'UNIT':
          if (state.unitStack.length === 0) throw new Error('unitStack is empty');
          const [unitCard, ...newUnitStack] = [...state.unitStack];
          return {
            myHands: [...state.myHands, unitCard],
            unitStack: newUnitStack,
            turn: { type: 'decision', player: 'myself' },
          };
        case 'TACTICAL':
          if (state.tacticalStack.length === 0) throw new Error('tacticalStack is empty');
          const [tacticalCard, ...newTacticalStack] = [...state.tacticalStack];
          return {
            myHands: [...state.myHands, tacticalCard],
            tacticalStack: newTacticalStack,
            turn: { type: 'decision', player: 'myself' },
          };
      }
    });
