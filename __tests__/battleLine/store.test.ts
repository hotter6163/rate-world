import { tacticalStack, unitStack } from '@/features/games/battleLine/constants';
import { BattleLineStore, useBattleLineStore } from '@/features/games/battleLine/store';
import { TacticalType } from '@/features/games/battleLine/types';
import { act, renderHook } from '@testing-library/react';

describe('battleLine/store', () => {
  let result: { current: BattleLineStore };

  beforeEach(() => {
    result = renderHook(() => useBattleLineStore()).result;
    act(() => result.current.setup());
  });

  const selectAndPlayCard = (handIndex: number, battlefieldIndex: number) => {
    act(() => result.current.selectHand(handIndex));
    act(() => result.current.playCard(battlefieldIndex));
  };

  describe('setup', () => {
    it('ストアの初期化', () => {
      act(() => result.current.setup());
      expect(result.current.unitStack.length).toBe(unitStack.length - 14);
      expect(result.current.tacticalStack.length).toBe(tacticalStack.length);
      expect(result.current.myHands.length).toBe(7);
      expect(result.current.opponentHands.length).toBe(7);
    });
  });

  describe('基本操作', () => {
    describe('自分の手札を選択', () => {
      it('通常の操作', () => {
        act(() => result.current.selectHand(0));
        expect(result.current.selectedIndex).toBe(0);
      });

      it('存在しないカードを選択するとエラー', () => {
        [-1, 7].forEach((i) => {
          expect(() => act(() => result.current.selectHand(i))).toThrowError();
        });
      });
    });

    describe('自分の手札を場に出す', () => {
      describe('ユニットカード', () => {
        it('カードを場に出す', () => {
          const card = { ...result.current.myHands[0] };
          selectAndPlayCard(0, 0);
          expect(result.current.battlefields[0].myFormation.length).toBe(1);
          expect(result.current.battlefields[0].myFormation[0]).toEqual(card);
          expect(result.current.myHands.length).toBe(6);
          expect(result.current.myHands).not.toContainEqual(card);
        });

        it('フィールドが埋まっているとエラー', () => {
          result.current.battlefields[0].myFormation = result.current.unitStack.slice(0, 3);
          act(() => result.current.selectHand(0));
          expect(() => act(() => result.current.playCard(0))).toThrowError();
          expect(result.current.myHands.length).toBe(7);
        });
      });

      describe('士気高揚戦術カード', () => {
        const tacticalCards = [
          {
            type: 'TACTICAL',
            id: TacticalType.ALEXANDER,
            tacticalType: TacticalType.ALEXANDER,
          },
          {
            type: 'TACTICAL',
            id: TacticalType.DARIUS,
            tacticalType: TacticalType.DARIUS,
          },
          {
            type: 'TACTICAL',
            id: TacticalType.COMPANION_CAVALRY,
            tacticalType: TacticalType.COMPANION_CAVALRY,
          },
          {
            type: 'TACTICAL',
            id: TacticalType.SHIELD_BEARERS,
            tacticalType: TacticalType.SHIELD_BEARERS,
          },
        ] as const;

        beforeEach(() => {
          result.current.myHands = [...tacticalCards, ...result.current.myHands.slice(4, 7)];
        });

        it('カードを場に出す', () => {
          tacticalCards.forEach((card, i) => {
            selectAndPlayCard(0, i);
            expect(result.current.battlefields[i].myFormation).toContainEqual(card);
            expect(result.current.myHands).not.toContainEqual(card);
          });
        });
      });

      describe('気象戦術カード', () => {
        const tacticalCards = [
          {
            type: 'TACTICAL',
            id: TacticalType.FOG,
            tacticalType: TacticalType.FOG,
          },
          {
            type: 'TACTICAL',
            id: TacticalType.MUD,
            tacticalType: TacticalType.MUD,
          },
        ] as const;

        beforeEach(() => {
          result.current.myHands = [...tacticalCards, ...result.current.myHands.slice(2, 7)];
        });

        it('カードを場に出す', () => {
          tacticalCards.forEach((card, i) => {
            selectAndPlayCard(0, i);
            expect(result.current.battlefields[i].field).toContainEqual(card);
            expect(result.current.myHands).not.toContainEqual(card);
          });
        });
      });

      it('カードを選択していないとエラー', () => {
        const battlefieldIndex = Math.floor(Math.random() * 9);
        expect(() => act(() => result.current.playCard(battlefieldIndex))).toThrowError();
      });

      it('存在しないフィールドに出すとエラー', () => {
        [-1, 9].forEach((i) => {
          expect(() => selectAndPlayCard(0, i)).toThrowError();
        });
      });
    });

    describe('手札を補充する', () => {
      it('ユニットカードを補充する', () => {
        const card = result.current.unitStack[0];
        const stackNumber = result.current.unitStack.length;
        selectAndPlayCard(0, 0);
        act(() => result.current.drawCard('UNIT'));
        expect(result.current.myHands.length).toBe(7);
        expect(result.current.myHands).toContainEqual(card);
        expect(result.current.unitStack.length).toBe(stackNumber - 1);
      });

      it('タクティカルカードを補充する', () => {
        const card = result.current.tacticalStack[0];
        const stackNumber = result.current.tacticalStack.length;
        selectAndPlayCard(0, 0);
        act(() => result.current.drawCard('TACTICAL'));
        expect(result.current.myHands.length).toBe(7);
        expect(result.current.myHands).toContainEqual(card);
        expect(result.current.tacticalStack.length).toBe(stackNumber - 1);
      });

      it('カードを出してない時はエラー', () => {
        expect(() => act(() => result.current.drawCard('UNIT'))).toThrowError();
      });

      it('山札がない時はエラー', () => {
        result.current.unitStack = [];
        result.current.tacticalStack = [];
        (['UNIT', 'TACTICAL'] as const).forEach((type) => {
          selectAndPlayCard(0, 0);
          expect(() => act(() => result.current.drawCard(type))).toThrowError();
        });
      });
    });
  });
});
