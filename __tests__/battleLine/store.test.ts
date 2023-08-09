import { tacticalStack, unitStack } from '@/features/games/battleLine/constants';
import { BattleLineStore, useBattleLineStore } from '@/features/games/battleLine/store';
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

    it('自分の手札を選択', () => {
      expect(result.current.selectedIndex).toBeNull();
      act(() => result.current.selectHand(0));
      expect(result.current.selectedIndex).toBe(0);
      act(() => result.current.selectHand(6));
      expect(result.current.selectedIndex).toBe(6);
      const test = (index: number) => () => act(() => result.current.selectHand(index));
      expect(test(-1)).toThrowError('index out of range');
      expect(test(7)).toThrowError('index out of range');
    });
  });
});
