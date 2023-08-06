import { TacticalCard, TacticalType, UNIT_VALUES, UnitCard, UnitColor } from './types';

export const unitStack: UnitCard[] = Object.values(UnitColor).flatMap((color) =>
  UNIT_VALUES.map((value) => ({ type: 'UNIT', id: `${color}-${value}`, color, value })),
);

export const tacticalStack: TacticalCard[] = Object.values(TacticalType).map((tacticalType) => ({
  type: 'TACTICAL',
  id: tacticalType,
  tacticalType,
}));
