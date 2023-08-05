import { shuffle } from '../utils';
import {
  Battlefield,
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
  battlefield: Battlefield;
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
  battlefield: {
    myFormation: [],
    yourFormation: [],
    field: null,
  },
  trash: [],
  setup: () => {
    const { unitStack, tacticalStack } = get();
    if (unitStack.length > 0 || tacticalStack.length > 0) return;

    const newUnitStack = shuffle(defaultUnitStack);
    const newMyHands = newUnitStack.splice(0, 7);
    const newOpponentHands = newUnitStack.splice(0, 7);
    set({
      unitStack: newUnitStack,
      tacticalStack: shuffle(defaultTacticalStack),
      myHands: newMyHands,
      opponentHands: newOpponentHands,
    });
  },
}));
