import { FormationType, UnitCard } from '../../types';

export const handleAllUnits = (unitCards: UnitCard[]) => {
  const cards = unitCards.sort((a, b) => a.value - b.value);
  const total = getTotal(cards);
  const formationType = getFormationType(cards);
  return { type: formationType, total };
};

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
