import { BattleLineStore } from '.';
import { TacticalType } from '../types';
import { isExpectedTurn } from './utils/isExpectedTurn';
import { splitCards } from './utils/splitCards';
import { ZustandSet } from '@/libs/zustand';

export const processScout =
  (set: ZustandSet<BattleLineStore>): BattleLineStore['processScout'] =>
  (selectedCards, removedCards) =>
    set((state) => {
      if (
        !isExpectedTurn(state.turn, {
          type: 'processing',
          player: 'myself',
          tacticalType: TacticalType.SCOUT,
        })
      )
        throw new Error('Not allowed');
      if (selectedCards.length !== 3) throw new Error('Must select 3 cards');
      if (removedCards.length !== 2) throw new Error('Must remove 2 cards');

      const myHands = [...state.myHands, ...selectedCards].filter(
        (card) => !removedCards.map(({ id }) => id).includes(card.id),
      );
      const { unitCards: removedUnitCards, tacticalCards: removedTacticalCards } =
        splitCards(removedCards);
      const unremovedCardIds = selectedCards
        .filter(({ id }) => !removedCards.some((card) => card.id === id))
        .map(({ id }) => id);
      const unitStack = [...removedUnitCards, ...state.unitStack].filter(
        (card) => !unremovedCardIds.includes(card.id),
      );
      const tacticalStack = [...removedTacticalCards, ...state.tacticalStack].filter(
        (card) => !unremovedCardIds.includes(card.id),
      );
      return {
        myHands,
        unitStack,
        tacticalStack,
        turn: { type: 'decision', player: 'myself' },
      };
    });
