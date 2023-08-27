import { Card, Formation, UnitCard } from '../types';
import { handleAllUnits } from './helpers/getFormation/handleAllUnits';
import { handleHasTactical } from './helpers/getFormation/handleHasTactical';
import { handleNone } from './helpers/getFormation/handleNone';

export const getFormation = (cards: Card[]): Formation => {
  if (cards.length < 3) return handleNone(cards);

  if (isAllUnits(cards)) return handleAllUnits(cards);
  else return handleHasTactical(cards);
};

const isAllUnits = (cards: Card[]): cards is UnitCard[] =>
  cards.every((card) => card.type === 'UNIT');
