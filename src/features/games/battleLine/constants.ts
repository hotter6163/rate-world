import { getCard } from './functions/getCard';
import { TacticalType, UNIT_VALUES, UnitColor } from './types';

export const unitStack = Object.values(UnitColor).flatMap((color) =>
  UNIT_VALUES.map((value) => getCard({ type: 'UNIT', color, value })),
);

export const tacticalStack = Object.values(TacticalType).map((tacticalType) =>
  getCard({ type: 'TACTICAL', tacticalType }),
);
