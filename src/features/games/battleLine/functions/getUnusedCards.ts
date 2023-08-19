import { tacticalStack, unitStack } from '../constants';
import { Battlefield, TacticalCard } from '../types';
import { getUsedCards } from './getUsedCards';

export const getUnusedCards = (
  battlefields: Battlefield[],
  trash: { mine: TacticalCard[]; opponent: TacticalCard[] },
) => {
  const usedCards = getUsedCards(battlefields, trash);
  return {
    unitCards: unitStack.filter((card) => !usedCards.some((usedCard) => usedCard.id === card.id)),
    tacticalCards: tacticalStack.filter(
      (card) => !usedCards.some((usedCard) => usedCard.id === card.id),
    ),
  };
};
