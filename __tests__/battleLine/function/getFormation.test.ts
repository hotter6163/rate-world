import { getCard } from '@/features/games/battleLine/functions/getCard';
import { getFormation } from '@/features/games/battleLine/functions/getFormation';
import {
  Card,
  FormationType,
  TacticalType,
  UnitCard,
  UnitColor,
} from '@/features/games/battleLine/types';

describe('getFormation', () => {
  const getTotal = (cards: UnitCard[]) => cards.reduce((acc, card) => acc + card.value, 0);

  describe('ユニットカードのみの場合', () => {
    const testUnitFormation = (formationType: FormationType, cards: UnitCard[]) => {
      it(formationType, () => {
        expect(getFormation(cards.slice(0, 3), false)).toEqual({
          type: formationType,
          total: getTotal(cards.slice(0, 3)),
        });

        expect(getFormation(cards.slice(0, 4), true)).toEqual({
          type: formationType,
          total: getTotal(cards.slice(0, 4)),
        });
      });
    };

    const tests = [
      {
        formationType: FormationType.WEDGE,
        cards: [
          getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 6 }),
          getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 7 }),
          getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 8 }),
          getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 5 }),
        ],
      },
      {
        formationType: FormationType.PHALANX,
        cards: [
          getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 5 }),
          getCard({ type: 'UNIT', color: UnitColor.PURPLE, value: 5 }),
          getCard({ type: 'UNIT', color: UnitColor.RED, value: 5 }),
          getCard({ type: 'UNIT', color: UnitColor.GREEN, value: 5 }),
        ],
      },
      {
        formationType: FormationType.BATTALION,
        cards: [
          getCard({ type: 'UNIT', color: UnitColor.RED, value: 5 }),
          getCard({ type: 'UNIT', color: UnitColor.RED, value: 1 }),
          getCard({ type: 'UNIT', color: UnitColor.RED, value: 10 }),
          getCard({ type: 'UNIT', color: UnitColor.RED, value: 8 }),
        ],
      },
      {
        formationType: FormationType.SKIRMISHER,
        cards: [
          getCard({ type: 'UNIT', color: UnitColor.GREEN, value: 2 }),
          getCard({ type: 'UNIT', color: UnitColor.ORANGE, value: 3 }),
          getCard({ type: 'UNIT', color: UnitColor.YELLOW, value: 4 }),
          getCard({ type: 'UNIT', color: UnitColor.RED, value: 1 }),
        ],
      },
      {
        formationType: FormationType.HOST,
        cards: [
          getCard({ type: 'UNIT', color: UnitColor.RED, value: 10 }),
          getCard({ type: 'UNIT', color: UnitColor.YELLOW, value: 7 }),
          getCard({ type: 'UNIT', color: UnitColor.PURPLE, value: 2 }),
          getCard({ type: 'UNIT', color: UnitColor.GREEN, value: 4 }),
        ],
      },
    ];

    tests.forEach(({ formationType, cards }) => {
      testUnitFormation(formationType, cards);
    });
  });

  describe('ユニットカードとタクティカルカードの組み合わせの場合', () => {
    describe('タクティカルカードが1枚の場合', () => {
      const testFormation = (
        formationType: FormationType,
        allCards: Card[],
        replaceTo: UnitCard[],
      ) => {
        it(formationType, () => {
          const first = allCards.map((card) => (card.type === 'TACTICAL' ? replaceTo[0] : card));
          expect(getFormation(allCards.slice(0, 3), false)).toEqual({
            type: formationType,
            total: getTotal(first.slice(0, 3)),
          });

          const second = allCards.map((card) =>
            card.type === 'TACTICAL' ? replaceTo[1] ?? replaceTo[0] : card,
          );
          expect(getFormation(allCards.slice(0, 4), true)).toEqual({
            type: formationType,
            total: getTotal(second.slice(0, 4)),
          });
        });
      };

      describe(`${TacticalType.ALEXANDER}, ${TacticalType.DARIUS}`, () => {
        const tests = [
          {
            formationType: FormationType.WEDGE,
            replaceTo: [
              getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 9 }),
              getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 6 }),
            ],
            cards: [
              getCard({ type: 'TACTICAL', tacticalType: TacticalType.ALEXANDER }),
              getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 7 }),
              getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 8 }),
              getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 5 }),
            ],
          },
          {
            formationType: FormationType.PHALANX,
            replaceTo: [getCard({ type: 'UNIT', color: UnitColor.RED, value: 7 })],
            cards: [
              getCard({ type: 'TACTICAL', tacticalType: TacticalType.DARIUS }),
              getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 7 }),
              getCard({ type: 'UNIT', color: UnitColor.GREEN, value: 7 }),
              getCard({ type: 'UNIT', color: UnitColor.ORANGE, value: 7 }),
            ],
          },
          {
            formationType: FormationType.BATTALION,
            replaceTo: [getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 10 })],
            cards: [
              getCard({ type: 'TACTICAL', tacticalType: TacticalType.ALEXANDER }),
              getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 3 }),
              getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 10 }),
              getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 7 }),
            ],
          },
          {
            formationType: FormationType.SKIRMISHER,
            replaceTo: [getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 2 })],
            cards: [
              getCard({ type: 'TACTICAL', tacticalType: TacticalType.DARIUS }),
              getCard({ type: 'UNIT', color: UnitColor.PURPLE, value: 1 }),
              getCard({ type: 'UNIT', color: UnitColor.RED, value: 3 }),
              getCard({ type: 'UNIT', color: UnitColor.GREEN, value: 4 }),
            ],
          },
          {
            formationType: FormationType.HOST,
            replaceTo: [getCard({ type: 'UNIT', color: UnitColor.RED, value: 10 })],
            cards: [
              getCard({ type: 'TACTICAL', tacticalType: TacticalType.ALEXANDER }),
              getCard({ type: 'UNIT', color: UnitColor.YELLOW, value: 7 }),
              getCard({ type: 'UNIT', color: UnitColor.PURPLE, value: 2 }),
              getCard({ type: 'UNIT', color: UnitColor.GREEN, value: 4 }),
            ],
          },
        ];

        tests.forEach(({ formationType, cards, replaceTo }) => {
          testFormation(formationType, cards, replaceTo);
        });
      });

      describe(TacticalType.COMPANION_CAVALRY, () => {
        const tests = [
          {
            formationType: FormationType.WEDGE,
            replaceTo: [getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 8 })],
            cards: [
              getCard({ type: 'TACTICAL', tacticalType: TacticalType.COMPANION_CAVALRY }),
              getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 7 }),
              getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 9 }),
              getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 6 }),
            ],
          },
          {
            formationType: FormationType.PHALANX,
            replaceTo: [getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 8 })],
            cards: [
              getCard({ type: 'TACTICAL', tacticalType: TacticalType.COMPANION_CAVALRY }),
              getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 8 }),
              getCard({ type: 'UNIT', color: UnitColor.GREEN, value: 8 }),
              getCard({ type: 'UNIT', color: UnitColor.ORANGE, value: 8 }),
            ],
          },
          {
            formationType: FormationType.BATTALION,
            replaceTo: [getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 8 })],
            cards: [
              getCard({ type: 'TACTICAL', tacticalType: TacticalType.COMPANION_CAVALRY }),
              getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 3 }),
              getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 10 }),
              getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 7 }),
            ],
          },
          {
            formationType: FormationType.SKIRMISHER,
            replaceTo: [getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 8 })],
            cards: [
              getCard({ type: 'TACTICAL', tacticalType: TacticalType.COMPANION_CAVALRY }),
              getCard({ type: 'UNIT', color: UnitColor.PURPLE, value: 7 }),
              getCard({ type: 'UNIT', color: UnitColor.RED, value: 9 }),
              getCard({ type: 'UNIT', color: UnitColor.GREEN, value: 10 }),
            ],
          },
          {
            formationType: FormationType.HOST,
            replaceTo: [getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 8 })],
            cards: [
              getCard({ type: 'TACTICAL', tacticalType: TacticalType.COMPANION_CAVALRY }),
              getCard({ type: 'UNIT', color: UnitColor.YELLOW, value: 7 }),
              getCard({ type: 'UNIT', color: UnitColor.PURPLE, value: 2 }),
              getCard({ type: 'UNIT', color: UnitColor.GREEN, value: 4 }),
            ],
          },
        ];

        tests.forEach(({ formationType, cards, replaceTo }) => {
          testFormation(formationType, cards, replaceTo);
        });
      });

      describe(TacticalType.SHIELD_BEARERS, () => {
        const tests = [
          {
            formationType: FormationType.WEDGE,
            replaceTo: [getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 2 })],
            cards: [
              getCard({ type: 'TACTICAL', tacticalType: TacticalType.SHIELD_BEARERS }),
              getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 1 }),
              getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 3 }),
              getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 4 }),
            ],
          },
          {
            formationType: FormationType.PHALANX,
            replaceTo: [getCard({ type: 'UNIT', color: UnitColor.RED, value: 1 })],
            cards: [
              getCard({ type: 'TACTICAL', tacticalType: TacticalType.SHIELD_BEARERS }),
              getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 1 }),
              getCard({ type: 'UNIT', color: UnitColor.GREEN, value: 1 }),
              getCard({ type: 'UNIT', color: UnitColor.ORANGE, value: 1 }),
            ],
          },
          {
            formationType: FormationType.BATTALION,
            replaceTo: [getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 3 })],
            cards: [
              getCard({ type: 'TACTICAL', tacticalType: TacticalType.SHIELD_BEARERS }),
              getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 3 }),
              getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 10 }),
              getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 7 }),
            ],
          },
          {
            formationType: FormationType.SKIRMISHER,
            replaceTo: [getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 3 })],
            cards: [
              getCard({ type: 'TACTICAL', tacticalType: TacticalType.SHIELD_BEARERS }),
              getCard({ type: 'UNIT', color: UnitColor.PURPLE, value: 2 }),
              getCard({ type: 'UNIT', color: UnitColor.RED, value: 1 }),
              getCard({ type: 'UNIT', color: UnitColor.GREEN, value: 4 }),
            ],
          },
          {
            formationType: FormationType.HOST,
            replaceTo: [getCard({ type: 'UNIT', color: UnitColor.RED, value: 3 })],
            cards: [
              getCard({ type: 'TACTICAL', tacticalType: TacticalType.SHIELD_BEARERS }),
              getCard({ type: 'UNIT', color: UnitColor.YELLOW, value: 7 }),
              getCard({ type: 'UNIT', color: UnitColor.PURPLE, value: 2 }),
              getCard({ type: 'UNIT', color: UnitColor.GREEN, value: 4 }),
            ],
          },
        ];

        tests.forEach(({ formationType, cards, replaceTo }) => {
          testFormation(formationType, cards, replaceTo);
        });
      });
    });

    it('タクティカルカードが複数枚の場合', () => {
      expect(
        getFormation(
          [
            getCard({ type: 'TACTICAL', tacticalType: TacticalType.ALEXANDER }),
            getCard({ type: 'TACTICAL', tacticalType: TacticalType.COMPANION_CAVALRY }),
            getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 7 }),
          ],
          false,
        ),
      ).toEqual({
        type: FormationType.WEDGE,
        total: 24,
      });

      expect(
        getFormation(
          [
            getCard({ type: 'TACTICAL', tacticalType: TacticalType.ALEXANDER }),
            getCard({ type: 'TACTICAL', tacticalType: TacticalType.SHIELD_BEARERS }),
            getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 2 }),
            getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 4 }),
          ],
          true,
        ),
      ).toEqual({
        type: FormationType.WEDGE,
        total: 14,
      });
    });
  });

  it('必要な枚数カードがない場合はNONE', () => {
    expect(
      getFormation(
        [
          getCard({ type: 'UNIT', color: UnitColor.BLUE, value: 1 }),
          getCard({ type: 'TACTICAL', tacticalType: TacticalType.ALEXANDER }),
        ],
        false,
      ),
    ).toEqual({
      type: FormationType.NONE,
      total: 11,
    });
  });
});
