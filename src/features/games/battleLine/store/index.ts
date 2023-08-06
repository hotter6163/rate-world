import { Battlefields, Card, TacticalCard, UnitCard } from '../types';
import { setupBattleLine } from './setup';
import { create } from 'zustand';

export type BattleLineStore = {
  unitStack: UnitCard[];
  tacticalStack: TacticalCard[];
  myHands: Card[];
  opponentHands: Card[];
  battlefields: Battlefields[];
  trash: Card[];
  setup: () => void;
};

export const useBattleLineStore = create<BattleLineStore>((set, get) => ({
  unitStack: [],
  tacticalStack: [],
  myHands: [],
  opponentHands: [],
  battlefields: [],
  trash: [],
  setup: setupBattleLine(set),
}));
