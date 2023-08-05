export enum UnitColor {
  RED = 'RED',
  BLUE = 'BLUE',
  GREEN = 'GREEN',
  YELLOW = 'YELLOW',
  PURPLE = 'PURPLE',
  ORANGE = 'ORANGE',
}

export const UNIT_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

export type UnitValue = (typeof UNIT_VALUES)[number];

export type UnitCard = {
  type: 'UNIT';
  color: UnitColor;
  value: UnitValue;
};

export enum TacticalType {
  ALEXANDER = 'ALEXANDER',
  DARIUS = 'DARIUS',
  COMPANION_CAVALRY = 'COMPANION_CAVALRY',
  SHIELD_BEARERS = 'SHIELD_BEARERS',
  FOG = 'FOG',
  MUD = 'MUD',
  SCOUT = 'SCOUT',
  REDEPLOY = 'REDEPLOY',
  DESERTER = 'DESERTER',
  TRAITOR = 'TRAITOR',
}

export type TacticalCard = {
  type: 'TACTICAL';
  tacticalType: TacticalType;
};

export type Card = UnitCard | TacticalCard;

export type Battlefield = {
  myFormation: Card[];
  yourFormation: Card[];
  field: TacticalCard | null;
};

export type Player = 'myself' | 'opponent';
