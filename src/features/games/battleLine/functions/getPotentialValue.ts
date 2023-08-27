import { POTENTIAL_VALUES } from '../constants';
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

const getMaxValue = (availableValues: number[]): number => availableValues.sort((a, b) => b - a)[0];
