import { Battlefields, Card, TacticalCard, UnitCard } from '../types';
import { setupBattleLine } from './setup';
import { create } from 'zustand';

export type BattleLineStore = {
  unitStack: UnitCard[];
  tacticalStack: TacticalCard[];
  myHands: Card[];
  opponentHands: Card[];
  battlefields: Battlefields[];
  trash: {
    mine: Card[];
    opponent: Card[];
  };
  setup: (test?: boolean) => void;
};

export const useBattleLineStore = create<BattleLineStore>((set) => ({
  unitStack: [],
  tacticalStack: [],
  myHands: [],
  opponentHands: [],
  battlefields: [],
  trash: {
    mine: [],
    opponent: [],
  },
  setup: setupBattleLine(set),
}));
