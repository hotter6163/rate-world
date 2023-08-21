import { Card, Formation, UnitCard } from '../../types';
import { handleAllUnits } from './handleAllUnits';
import { handleHasTactical } from './handleHasTactical';
import { handleNone } from './handleNone';

export const getFormation = (cards: Card[]): Formation => {
  if (cards.length < 3) return handleNone(cards);

  if (isAllUnits(cards)) return handleAllUnits(cards);
  else return handleHasTactical(cards);
};

const isAllUnits = (cards: Card[]): cards is UnitCard[] =>
  cards.every((card) => card.type === 'UNIT');
