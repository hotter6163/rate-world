import { UnitCard, UnitValue } from '../types';

export const calculateExpectedValues = (
  unitCards: UnitCard[],
  isMud: boolean,
): UnitValue[] | null => {
  const sortedCards = unitCards.sort((a, b) => a.value - b.value);

  if (sortedCards.length === 0) return null;

  const isAllSameValue = sortedCards.every((card, _, all) => card.value === all[0].value);
  const identicalValues = isAllSameValue ? [sortedCards[0].value] : [];
  const consecutiveValues = calculateConsecutiveValues(unitCards, isMud) as UnitValue[];

  if (unitCards.length > 1 && isAllSameValue) return identicalValues;
  else return [...identicalValues, ...consecutiveValues];
};

const calculateConsecutiveValues = (unitCards: UnitCard[], isMud: boolean): UnitValue[] => {
  const requiredCards = isMud ? 4 : 3;
  const cardValues = unitCards.map((card) => card.value);
  const diff = cardValues[cardValues.length - 1] - cardValues[0];
  const range = requiredCards * 2 - diff - 1;

  if (range < requiredCards) return [];

  return Array.from(
    { length: range },
    (_, index) => cardValues[0] + index - (range - requiredCards),
  ).filter(
    (value: number) => value >= 1 && value <= 10 && !cardValues.includes(value as UnitValue),
  ) as UnitValue[];
};
