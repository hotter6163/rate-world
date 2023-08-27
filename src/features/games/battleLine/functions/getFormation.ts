import { Card, Formation, FormationType, UnitCard, UnitColor } from '../types';
import { getCard } from './getCard';
import { getPotentialValue } from './getPotentialValue';

export const getFormation = (cards: Card[], isMud: boolean): Formation => {
  if (cards.length < (isMud ? 4 : 3)) return { type: FormationType.NONE, total: getTotal(cards) };

  const unitCards = replaceTacticalCards(cards);
  return judge(unitCards);
};

const getTotal = (cards: Card[]) =>
  cards.reduce((acc, card) => {
    if (card.type === 'UNIT') return acc + card.value;
    else return acc + (getPotentialValue(card.tacticalType) || 0);
  }, 0);

const replaceTacticalCards = (cards: Card[]) =>
  cards.map((card) => {
    if (card.type === 'UNIT') return card;
    else return getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 1 });
  });

const judge = (unitCards: UnitCard[]) => {
  const cards = unitCards.sort((a, b) => a.value - b.value);
  const total = getTotal(cards);
  const formationType = getFormationType(cards);
  return { type: formationType, total };
};

const getFormationType = (cards: UnitCard[]): FormationType => {
  const isSameColor = cards.every((card, _, all) => card.color === all[0].color);
  const isSameValue = cards.every((card, _, all) => card.value === all[0].value);
  const isConsecutive = cards.every(
    (card, index, all) => index === 0 || card.value === all[index - 1].value + 1,
  );
  if (isSameColor && isConsecutive) return FormationType.WEDGE;
  else if (isSameValue) return FormationType.PHALANX;
  else if (isSameColor) return FormationType.BATTALION;
  else if (isConsecutive) return FormationType.SKIRMISHER;
  else return FormationType.HOST;
};
