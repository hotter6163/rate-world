import { getCard } from './functions/getCard';
import { TacticalType, UNIT_VALUES, UnitColor } from './types';

export const unitStack = Object.values(UnitColor).flatMap((color) =>
  UNIT_VALUES.map((value) => getCard({ type: 'UNIT', color, value })),
);

export const tacticalStack = Object.values(TacticalType).map((tacticalType) =>
  getCard({ type: 'TACTICAL', tacticalType }),
);

export const POTENTIAL_VALUES: { [key in TacticalType]: number[] } = {
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
