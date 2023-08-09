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
});
