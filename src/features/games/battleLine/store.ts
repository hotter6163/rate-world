import { shuffle } from '../utils';
import {
  Battlefields,
  Card,
  TacticalCard,
  TacticalType,
  UNIT_VALUES,
  UnitCard,
  UnitColor,
} from './types';
import { create } from 'zustand';

type BattleLineStore = {
  unitStack: UnitCard[];
  tacticalStack: TacticalCard[];
  myHands: Card[];
  opponentHands: Card[];
  battlefields: Battlefields[];
  trash: Card[];
  setup: () => void;
};

const defaultUnitStack: UnitCard[] = Object.values(UnitColor).flatMap((color) =>
  UNIT_VALUES.map((value) => ({ type: 'UNIT', color, value })),
);

const defaultTacticalStack: TacticalCard[] = Object.values(TacticalType).map((tacticalType) => ({
  type: 'TACTICAL',
  tacticalType,
}));

export const useBattleLineStore = create<BattleLineStore>((set, get) => ({
  unitStack: [],
  tacticalStack: [],
  myHands: [],
  opponentHands: [],
  battlefields: [],
  trash: [],
  setup: () => {
    const store = get();
    if (store.battlefields.length > 0) return;

    const unitStack = shuffle(defaultUnitStack);
    const tacticalStack = shuffle(defaultTacticalStack);
    const myHands = unitStack.splice(0, 7);
    const opponentHands = unitStack.splice(0, 7);
    const battlefields: Battlefields[] = Array(9).fill({
      myFormation: [],
      opponentFormation: [],
      field: null,
    });
    set({
      unitStack,
      tacticalStack,
      myHands,
      opponentHands,
      battlefields,
    });
  },
}));
