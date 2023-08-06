import { BattleLineStore } from '.';
import { shuffle } from '../../utils';
import {
  Battlefields,
  TacticalCard,
  TacticalType,
  UNIT_VALUES,
  UnitCard,
  UnitColor,
} from '../types';
import { ZustandSet } from '@/libs/zustand';

const defaultUnitStack: UnitCard[] = Object.values(UnitColor).flatMap((color) =>
  UNIT_VALUES.map((value) => ({ type: 'UNIT', color, value })),
);

const defaultTacticalStack: TacticalCard[] = Object.values(TacticalType).map((tacticalType) => ({
  type: 'TACTICAL',
  tacticalType,
}));

export const setupBattleLine = (set: ZustandSet<BattleLineStore>) => () =>
  set((state) => {
    if (state.battlefields.length > 0) return {};

    const unitStack = shuffle(defaultUnitStack);
    const tacticalStack = shuffle(defaultTacticalStack);
    const myHands = unitStack.splice(0, 7);
    const opponentHands = unitStack.splice(0, 7);
    const battlefields: Battlefields[] = Array(9)
      .fill(null)
      .map(() => ({
        myFormation: [],
        opponentFormation: [],
        field: null,
      }));

    // for testing
    battlefields.forEach((_, index) => {
      const myNumber = [0, 8].includes(index) ? 3 : Math.floor(Math.random() * 4);
      const opponentNumber = [0, 8].includes(index) ? 3 : Math.floor(Math.random() * 4);
      console.log(myNumber, opponentNumber);
      const myFormation = unitStack.splice(0, myNumber);
      const opponentFormation = unitStack.splice(0, opponentNumber);
      console.log(index, myFormation, opponentFormation);
      battlefields[index].myFormation = [...myFormation];
      battlefields[index].opponentFormation = [...opponentFormation];
    });

    return {
      unitStack,
      tacticalStack,
      myHands,
      opponentHands,
      battlefields,
    };
  });
