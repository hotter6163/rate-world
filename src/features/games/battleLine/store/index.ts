import { Battlefields, Card, TacticalCard, UnitCard } from '../types';
import { selectHand } from './selectHand';
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
  selectedIndex: number | null;
  setup: (test?: boolean) => void;
  selectHand: (index: number) => void;
  playCard: (index?: number) => void;
  drawCard: (cardType: Card['type']) => void;
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
  selectedIndex: null,
  setup: setupBattleLine(set),
  selectHand: selectHand(set),
}));
