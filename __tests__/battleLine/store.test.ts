import { tacticalStack, unitStack } from '@/features/games/battleLine/constants';
import { BattleLineStore, useBattleLineStore } from '@/features/games/battleLine/store';
import { Card } from '@/features/games/battleLine/types';
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

      it('境界テスト', () => {
        const test = (index: number) => () => act(() => result.current.selectHand(index));
        expect(test(-1)).toThrowError();
        expect(test(7)).toThrowError();
      });
    });

    describe('自分の手札を場に出す', () => {
      it('通常操作', () => {
        const battlefieldIndex = Math.floor(Math.random() * 9);
        const cardIndex = Math.floor(Math.random() * 7);
        const card = { ...result.current.myHands[cardIndex] };

        expect(result.current.battlefields[battlefieldIndex].myFormation.length).toBe(0);
        act(() => result.current.selectHand(cardIndex));
        act(() => result.current.playCard(battlefieldIndex));
        expect(result.current.battlefields[battlefieldIndex].myFormation.length).toBe(1);
        expect(result.current.battlefields[battlefieldIndex].myFormation[0]).toEqual(card);
        expect(result.current.myHands.length).toBe(6);
      });

      it('カードを選択していないとエラー', () => {
        const battlefieldIndex = Math.floor(Math.random() * 9);
        expect(() => act(() => result.current.playCard(battlefieldIndex))).toThrowError();
      });

      it('境界テスト', () => {
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
