import { BattleLineStore } from '.';
import { shuffle } from '../../utils';
import { tacticalStack as defaultTacticalStack, unitStack as defaultUnitStack } from '../constants';
import { Battlefields, UnitCard } from '../types';
import { ZustandSet } from '@/libs/zustand';

export const setupBattleLine =
  (set: ZustandSet<BattleLineStore>): BattleLineStore['setup'] =>
  (test) =>
    set((state) => {
      if (state.battlefields.length > 0) return {};

      const unitStack = shuffle([...defaultUnitStack]);
      const tacticalStack = shuffle([...defaultTacticalStack]);
      const myHands = unitStack.splice(0, 7);
      const opponentHands = unitStack.splice(0, 7);
      const battlefields: Battlefields[] = Array(9)
        .fill(null)
        .map(() => ({
          myFormation: [],
          opponentFormation: [],
          field: null,
        }));

      if (test) testSetup(battlefields, unitStack);

      return {
        unitStack,
        tacticalStack,
        myHands,
        opponentHands,
        battlefields,
      };
    });

const testSetup = (battlefields: Battlefields[], unitStack: UnitCard[]) => {
  battlefields.forEach((_, index) => {
    const myNumber = index === 0 ? 3 : index === 8 ? 4 : Math.floor(Math.random() * 4);
    const opponentNumber = index === 0 ? 3 : index === 8 ? 4 : Math.floor(Math.random() * 4);
    const myFormation = unitStack.splice(0, myNumber);
    const opponentFormation = unitStack.splice(0, opponentNumber);
    battlefields[index].myFormation = [...myFormation];
    battlefields[index].opponentFormation = [...opponentFormation];
  });
};
