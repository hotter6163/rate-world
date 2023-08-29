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
  id: string;
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
  id: string;
  tacticalType: TacticalType;
};

export type Card = UnitCard | TacticalCard;

export type Battlefield = {
  myFormation: Card[];
  opponentFormation: Card[];
  field: TacticalCard[];
};

export type Player = 'myself' | 'opponent';

export const CONSPIRACY_CARD_TYPES = [
  TacticalType.SCOUT,
  TacticalType.REDEPLOY,
  TacticalType.DESERTER,
  TacticalType.TRAITOR,
] as const;

export type Turn =
  | {
      type: 'init';
    }
  | {
      type: 'playCard' | 'drawCard' | 'decision';
      player: Player;
    }
  | {
      type: 'processing';
      player: Player;
      tacticalType: (typeof CONSPIRACY_CARD_TYPES)[number];
    };

export enum FormationType {
  WEDGE = 'WEDGE',
  PHALANX = 'PHALANX',
  BATTALION = 'BATTALION',
  SKIRMISHER = 'SKIRMISHER',
  HOST = 'HOST',
  NONE = 'NONE',
}

export type Formation = {
  type: FormationType;
  total: number;
};
