import { BattleLineStore } from '.';
import { shuffle } from '../../utils';
import { tacticalStack as defaultTacticalStack, unitStack as defaultUnitStack } from '../constants';
import { Battlefield, UnitCard } from '../types';
import { isExpectedTurn } from './utils/isExpectedTurn';
import { ZustandSet } from '@/libs/zustand';

export const setupBattleLine =
  (set: ZustandSet<BattleLineStore>): BattleLineStore['setup'] =>
  (player, test) =>
    set((state) => {
      if (!isExpectedTurn(state.turn, { type: 'init' })) throw new Error('Invalid turn type');

      const unitStack = shuffle([...defaultUnitStack]);
      const tacticalStack = shuffle([...defaultTacticalStack]);
      const myHands = unitStack.splice(0, 7);
      const opponentHands = unitStack.splice(0, 7);
      const battlefields: Battlefield[] = Array(9)
        .fill(null)
        .map(() => ({
          myFormation: [],
          opponentFormation: [],
          field: [],
        }));

      if (test) testSetup(battlefields, unitStack);

      return {
        unitStack,
        tacticalStack,
        myHands,
        opponentHands,
        battlefields,
        turn: { type: 'playCard', player },
      };
    });

const testSetup = (battlefields: Battlefield[], unitStack: UnitCard[]) => {
  battlefields.forEach((_, index) => {
    const myNumber = index === 0 ? 3 : index === 8 ? 4 : Math.floor(Math.random() * 4);
    const opponentNumber = index === 0 ? 3 : index === 8 ? 4 : Math.floor(Math.random() * 4);
    const myFormation = unitStack.splice(0, myNumber);
    const opponentFormation = unitStack.splice(0, opponentNumber);
    battlefields[index].myFormation = [...myFormation];
    battlefields[index].opponentFormation = [...opponentFormation];
  });
};
