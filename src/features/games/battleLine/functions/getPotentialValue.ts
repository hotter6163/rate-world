import { TacticalType } from '../types';

export const getPotentialValue = (tacticalType: TacticalType, expectedValues?: number[]) => {
  const potentialValues = POTENTIAL_VALUES[tacticalType];
  if (expectedValues) {
    const availableValues = expectedValues.filter((value) => potentialValues.includes(value));
    return getMaxValue(availableValues.length ? availableValues : potentialValues);
  } else {
    return getMaxValue(potentialValues);
  }
};

const getMaxValue = (availableValues: number[]) => availableValues.sort((a, b) => b - a)[0] ?? 0;

const POTENTIAL_VALUES: { [key in TacticalType]: number[] } = {
  [TacticalType.ALEXANDER]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [TacticalType.COMPANION_CAVALRY]: [8],
  [TacticalType.DARIUS]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [TacticalType.DESERTER]: [],
  [TacticalType.FOG]: [],
  [TacticalType.MUD]: [],
  [TacticalType.REDEPLOY]: [],
  [TacticalType.SCOUT]: [],
  [TacticalType.SHIELD_BEARERS]: [1, 2, 3],
  [TacticalType.TRAITOR]: [],
};
