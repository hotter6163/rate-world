import { unitStack } from '@/features/games/battleLine/constants';
import { getCard } from '@/features/games/battleLine/functions/getCard';
import { getUnusedCards } from '@/features/games/battleLine/functions/getUnusedCards';
import { TacticalType, UnitColor } from '@/features/games/battleLine/types';

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
