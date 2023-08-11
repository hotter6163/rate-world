import { tacticalStack, unitStack } from '@/features/games/battleLine/constants';
import { BattleLineStore, useBattleLineStore } from '@/features/games/battleLine/store';
import { Card, TacticalType } from '@/features/games/battleLine/types';
import { RenderHookResult, act, renderHook } from '@testing-library/react';

describe('battleLine/store', () => {
  let storeHookResult: RenderHookResult<BattleLineStore, unknown>;
  let result: { current: BattleLineStore };

  beforeEach(() => {
    storeHookResult = renderHook(() => useBattleLineStore());
    result = storeHookResult.result;
  });

  describe('setup', () => {
    it('ストアの初期化前は、unitStack、tacticalStack、myHands、opponentHandsが空である', () => {
      expect(result.current.unitStack.length).toBe(0);
      expect(result.current.tacticalStack.length).toBe(0);
      expect(result.current.myHands.length).toBe(0);
      expect(result.current.opponentHands.length).toBe(0);
    });

    it('ストアの初期化', () => {
      act(() => result.current.setup());
      expect(result.current.unitStack.length).toBe(unitStack.length - 14);
      expect(result.current.tacticalStack.length).toBe(tacticalStack.length);
      expect(result.current.myHands.length).toBe(7);
      expect(result.current.opponentHands.length).toBe(7);
    });
  });

  describe('基本操作', () => {
    beforeEach(() => {
      const result = storeHookResult.result;
      act(() => result.current.setup());
    });

    describe('自分の手札を選択', () => {
      it('通常の操作', () => {
        expect(result.current.selectedIndex).toBeNull();
        Array(7)
          .fill(null)
          .forEach((_, index) => {
            act(() => result.current.selectHand(index));
            expect(result.current.selectedIndex).toBe(index);
          });
      });

      it('存在しないカードを選択するとエラー', () => {
        const test = (index: number) => () => act(() => result.current.selectHand(index));
        expect(test(-1)).toThrowError();
        expect(test(7)).toThrowError();
      });
    });

    describe('自分の手札を場に出す', () => {
      describe('ユニットカード', () => {
        it('カードを場に出す', () => {
          Array(9)
            .fill(null)
            .forEach((_, index) => {
              const cardIndex = Math.floor(Math.random() * 7);
              const card = { ...result.current.myHands[cardIndex] };
              expect(result.current.battlefields[index].myFormation.length).toBe(0);
              act(() => result.current.selectHand(cardIndex));
              act(() => result.current.playCard(index));
              expect(result.current.battlefields[index].myFormation.length).toBe(1);
              expect(result.current.battlefields[index].myFormation[0]).toEqual(card);
              expect(result.current.myHands.length).toBe(6);
              expect(result.current.myHands).not.toContainEqual(card);
              act(() => result.current.drawCard('UNIT'));
            });
        });

        it('フィールドが埋まっているとエラー', () => {
          result.current.battlefields[0].myFormation = result.current.unitStack.slice(0, 3);
          const test = () => act(() => result.current.playCard(0));
          act(() => result.current.selectHand(0));
          expect(test).toThrowError();
          expect(result.current.myHands.length).toBe(7);
        });
      });

      describe('士気高揚戦術カード', () => {
        const alexander = {
          type: 'TACTICAL',
          id: TacticalType.ALEXANDER,
          tacticalType: TacticalType.ALEXANDER,
        } as const;
        const darius = {
          type: 'TACTICAL',
          id: TacticalType.DARIUS,
          tacticalType: TacticalType.DARIUS,
        } as const;
        const companionCavalry = {
          type: 'TACTICAL',
          id: TacticalType.COMPANION_CAVALRY,
          tacticalType: TacticalType.COMPANION_CAVALRY,
        } as const;
        const shieldBearers = {
          type: 'TACTICAL',
          id: TacticalType.SHIELD_BEARERS,
          tacticalType: TacticalType.SHIELD_BEARERS,
        } as const;

        beforeEach(() => {
          result.current.myHands = [
            { ...alexander },
            { ...darius },
            { ...companionCavalry },
            { ...shieldBearers },
            ...result.current.myHands.slice(4, 7),
          ];
        });

        it('カードを場に出す', () => {
          act(() => result.current.selectHand(0));
          act(() => result.current.playCard(0));
          expect(result.current.battlefields[0].myFormation[0]).toEqual(alexander);
          expect(result.current.myHands).not.toContainEqual(alexander);
          act(() => result.current.selectHand(0));
          act(() => result.current.playCard(1));
          expect(result.current.battlefields[1].myFormation[0]).toEqual(darius);
          expect(result.current.myHands).not.toContainEqual(darius);
          act(() => result.current.selectHand(0));
          act(() => result.current.playCard(2));
          expect(result.current.battlefields[2].myFormation[0]).toEqual(companionCavalry);
          expect(result.current.myHands).not.toContainEqual(companionCavalry);
          act(() => result.current.selectHand(0));
          act(() => result.current.playCard(3));
          expect(result.current.battlefields[3].myFormation[0]).toEqual(shieldBearers);
          expect(result.current.myHands).not.toContainEqual(shieldBearers);
        });

        it('フィールドが埋まっているとエラー', () => {
          result.current.battlefields[0].myFormation = result.current.unitStack.slice(0, 3);
          const test = () => act(() => result.current.playCard(0));
          act(() => result.current.selectHand(0));
          expect(test).toThrowError();
          expect(result.current.myHands).toContainEqual(alexander);
          act(() => result.current.selectHand(1));
          expect(test).toThrowError();
          expect(result.current.myHands).toContainEqual(darius);
          act(() => result.current.selectHand(2));
          expect(test).toThrowError();
          expect(result.current.myHands).toContainEqual(companionCavalry);
          act(() => result.current.selectHand(3));
          expect(test).toThrowError();
          expect(result.current.myHands).toContainEqual(shieldBearers);
        });
      });

      describe('気象戦術カード', () => {
        const fog = {
          type: 'TACTICAL',
          id: TacticalType.FOG,
          tacticalType: TacticalType.FOG,
        } as const;
        const mud = {
          type: 'TACTICAL',
          id: TacticalType.MUD,
          tacticalType: TacticalType.MUD,
        } as const;

        beforeEach(() => {
          result.current.myHands = [{ ...fog }, { ...mud }, ...result.current.myHands.slice(2, 7)];
        });

        it('カードを場に出す', () => {
          act(() => result.current.selectHand(0));
          act(() => result.current.playCard(0));
          expect(result.current.battlefields[0].field[0]).toEqual(fog);
          act(() => result.current.selectHand(0));
          act(() => result.current.playCard(1));
          expect(result.current.battlefields[1].field[0]).toEqual(mud);
        });
      });

      it('カードを選択していないとエラー', () => {
        const battlefieldIndex = Math.floor(Math.random() * 9);
        expect(() => act(() => result.current.playCard(battlefieldIndex))).toThrowError();
      });

      it('存在しないフィールドに出すとエラー', () => {
        const test = (index: number) => () => act(() => result.current.playCard(index));
        act(() => result.current.selectHand(0));
        expect(test(-1)).toThrowError();
        expect(test(9)).toThrowError();
      });
    });

    describe('手札を補充する', () => {
      it('ユニットカードを補充する', () => {
        const cardId = result.current.unitStack[0].id;
        const stackNumber = result.current.unitStack.length;
        act(() => result.current.selectHand(0));
        act(() => result.current.playCard(0));
        act(() => result.current.drawCard('UNIT'));
        expect(result.current.myHands.length).toBe(7);
        const index = result.current.myHands.findIndex((hand) => hand.id === cardId);
        expect(index).toBeGreaterThan(-1);
        expect(index).toBeLessThan(7);
        expect(result.current.unitStack.length).toBe(stackNumber - 1);
      });

      it('タクティカルカードを補充する', () => {
        const cardId = result.current.tacticalStack[0].id;
        const stackNumber = result.current.tacticalStack.length;
        act(() => result.current.selectHand(0));
        act(() => result.current.playCard(0));
        act(() => result.current.drawCard('TACTICAL'));
        expect(result.current.myHands.length).toBe(7);
        const index = result.current.myHands.findIndex((hand) => hand.id === cardId);
        expect(index).toBeGreaterThan(-1);
        expect(index).toBeLessThan(7);
        expect(result.current.tacticalStack.length).toBe(stackNumber - 1);
      });

      it('カードを出してない時はエラー', () => {
        const test = () => act(() => result.current.drawCard('UNIT'));
        expect(result.current.myHands.length).toBe(7);
        expect(test).toThrowError();
      });

      it('山札がない時はエラー', () => {
        result.current.unitStack = [];
        result.current.tacticalStack = [];
        const test = (type: Card['type']) => () => act(() => result.current.drawCard(type));
        act(() => result.current.selectHand(0));
        act(() => result.current.playCard(0));
        expect(test('UNIT')).toThrowError();
        expect(test('TACTICAL')).toThrowError();
      });
    });
  });
});
