import { Card, FormationType } from '../../types';
import { getPotentialValue } from '../getPotentialValue';

export const handleNone = (cards: Card[]) => {
  const total = getTotal(cards);
  return { type: FormationType.NONE, total };
};

const getTotal = (cards: Card[]) =>
  cards.reduce((acc, card) => {
    if (card.type === 'UNIT') return acc + card.value;
    else return acc + getPotentialValue(card.tacticalType);
  }, 0);
