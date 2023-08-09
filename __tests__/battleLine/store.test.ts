import { unitStack } from '@/features/games/battleLine/constants';
import { useBattleLineStore } from '@/features/games/battleLine/store';
import { act, renderHook } from '@testing-library/react';

describe('battleLine/store', () => {
  it('ストアの初期化', () => {
    const { result } = renderHook(() => useBattleLineStore());
    act(() => result.current.setup());
    expect(result.current.unitStack.length).toBe(unitStack.length - 14);
    expect(result.current.tacticalStack.length).toBe(10);
    expect(result.current.myHands.length).toBe(7);
    expect(result.current.opponentHands.length).toBe(7);
  });
});
