import { Battlefield, Card, Player, TacticalCard, Turn, UnitCard } from '../types';
import { drawCard } from './drawCard';
import { playCard } from './playCard';
import { selectHand } from './selectHand';
import { setupBattleLine } from './setup';
import { create } from 'zustand';

export type BattleLineStore = {
  unitStack: UnitCard[];
  tacticalStack: TacticalCard[];
  myHands: Card[];
  opponentHands: Card[];
  battlefields: Battlefield[];
  myTrash: Card[];
  opponentTrash: Card[];
  selectedIndex: number | null;
  turn: Turn;
  setup: (player: Player, test?: boolean) => void;
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
  myTrash: [],
  opponentTrash: [],
  selectedIndex: null,
  turn: { type: 'init' },
  setup: setupBattleLine(set),
  selectHand: selectHand(set),
  playCard: playCard(set),
  drawCard: drawCard(set),
}));
