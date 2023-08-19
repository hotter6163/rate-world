import { Card, Formation, FormationType, UnitCard, UnitColor } from '../types';
import { getCard } from '../utils';

export const getFormation = (cards: Card[]): Formation => {
  const unitCards = convertToUnitCards(cards);
  const total = getTotal(unitCards);
  if (unitCards.length < 3) {
    return { type: FormationType.NONE, total };
  }

  const formationType = getFormationType(unitCards);
  return { type: formationType, total };
};

const convertToUnitCards = (card: Card[]): UnitCard[] =>
  card
    .map((card) => {
      if (card.type === 'UNIT') {
        return card;
      }
      return getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 1 });
    })
    .sort((a, b) => a.value - b.value);

const getTotal = (cards: UnitCard[]) => cards.reduce((acc, card) => acc + card.value, 0);

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
