import { unitStack } from '@/features/games/battleLine/constants';
import { getFormation } from '@/features/games/battleLine/functions/getFormation';
import { getUnusedCards } from '@/features/games/battleLine/functions/getUnusedCards';
import {
  FormationType,
  TacticalType,
  UnitCard,
  UnitColor,
} from '@/features/games/battleLine/types';
import { getCard } from '@/features/games/battleLine/utils';

describe('getUnusedCards', () => {
  const battlefields = [
    {
      myFormation: [
        getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 1 }),
        getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 2 }),
      ],
      opponentFormation: [getCard({ type: 'TACTICAL', tacticalType: TacticalType.ALEXANDER })],
      field: [getCard({ type: 'TACTICAL', tacticalType: TacticalType.FOG })],
    },
  ];
  const trash = {
    mine: [getCard({ type: 'TACTICAL', tacticalType: TacticalType.SCOUT })],
    opponent: [],
  };
  const usedCards = [
    getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 1 }),
    getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 2 }),
    getCard({ type: 'TACTICAL', tacticalType: TacticalType.ALEXANDER }),
    getCard({ type: 'TACTICAL', tacticalType: TacticalType.FOG }),
    getCard({ type: 'TACTICAL', tacticalType: TacticalType.SCOUT }),
  ];

  it('使用されているカードは山札になく、使用されていないカードは山札に存在する', () => {
    const { unitCards, tacticalCards } = getUnusedCards(battlefields, trash);
    unitStack.forEach((card) => {
      if (usedCards.some((usedCard) => usedCard.id === card.id)) {
        expect(unitCards).not.toContain(card);
      } else {
        expect(unitCards).toContain(card);
      }
    });
    tacticalCards.forEach((card) => {
      if (usedCards.some((usedCard) => usedCard.id === card.id)) {
        expect(tacticalCards).not.toContain(card);
      } else {
        expect(tacticalCards).toContain(card);
      }
    });
  });
});

describe('getFormation', () => {
  describe('ユニットカードのみの場合', () => {
    const getTotal = (cards: UnitCard[]) => cards.reduce((acc, card) => acc + card.value, 0);

    const testUnitFormation = (
      formationType: FormationType,
      cards: [UnitCard, UnitCard, UnitCard, UnitCard],
    ) => {
      it(formationType, () => {
        expect(getFormation(cards.slice(0, 3))).toEqual({
          type: formationType,
          total: getTotal(cards.slice(0, 3)),
        });

        expect(getFormation(cards.slice(0, 4))).toEqual({
          type: formationType,
          total: getTotal(cards.slice(0, 4)),
        });
      });
    };

    testUnitFormation(FormationType.WEDGE, [
      getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 6 }),
      getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 7 }),
      getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 8 }),
      getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 5 }),
    ]);

    testUnitFormation(FormationType.PHALANX, [
      getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 5 }),
      getCard({ type: 'UNIT', color: UnitColor.PURPLE, value: 5 }),
      getCard({ type: 'UNIT', color: UnitColor.RED, value: 5 }),
      getCard({ type: 'UNIT', color: UnitColor.GREEN, value: 5 }),
    ]);

    testUnitFormation(FormationType.BATTALION, [
      getCard({ type: 'UNIT', color: UnitColor.RED, value: 5 }),
      getCard({ type: 'UNIT', color: UnitColor.RED, value: 1 }),
      getCard({ type: 'UNIT', color: UnitColor.RED, value: 10 }),
      getCard({ type: 'UNIT', color: UnitColor.RED, value: 8 }),
    ]);

    testUnitFormation(FormationType.SKIRMISHER, [
      getCard({ type: 'UNIT', color: UnitColor.GREEN, value: 2 }),
      getCard({ type: 'UNIT', color: UnitColor.ORANGE, value: 3 }),
      getCard({ type: 'UNIT', color: UnitColor.YELLOW, value: 4 }),
      getCard({ type: 'UNIT', color: UnitColor.RED, value: 1 }),
    ]);

    testUnitFormation(FormationType.HOST, [
      getCard({ type: 'UNIT', color: UnitColor.RED, value: 10 }),
      getCard({ type: 'UNIT', color: UnitColor.YELLOW, value: 7 }),
      getCard({ type: 'UNIT', color: UnitColor.PURPLE, value: 2 }),
      getCard({ type: 'UNIT', color: UnitColor.GREEN, value: 4 }),
    ]);
  });

  it('カードが3枚か4枚でない場合はNONE', () => {
    expect(
      getFormation([
        getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 1 }),
        getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 2 }),
      ]),
    ).toEqual({
      type: FormationType.NONE,
      total: 3,
    });
  });
});