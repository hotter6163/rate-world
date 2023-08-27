import { TacticalCard, TacticalType, UnitCard, UnitColor, UnitValue } from '../types';

type UnitArgument = {
  type: 'UNIT';
  color: UnitColor;
  value: UnitValue;
};

type TacticalArgument = {
  type: 'TACTICAL';
  tacticalType: TacticalType;
};

type Argument = UnitArgument | TacticalArgument;

export function getCard(arg: UnitArgument): UnitCard;
export function getCard(arg: TacticalArgument): TacticalCard;
export function getCard(arg: Argument): UnitCard | TacticalCard {
  switch (arg.type) {
    case 'UNIT':
      return {
        type: 'UNIT',
        id: `${arg.color}-${arg.value}`,
        color: arg.color,
        value: arg.value,
      };
    case 'TACTICAL':
      return {
        type: 'TACTICAL',
        id: arg.tacticalType,
        tacticalType: arg.tacticalType,
      };
  }
}
