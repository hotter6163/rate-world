import { Turn } from '../../types';

export const isExpectedTurn = (turn: Turn, expected: Turn) => {
  switch (expected.type) {
    case 'init':
      return turn.type === 'init';
    case 'playCard':
    case 'drawCard':
    case 'decision':
      return turn.type === expected.type && turn.player === expected.player;
    case 'processing':
      return (
        turn.type === 'processing' &&
        turn.player === expected.player &&
        turn.tacticalType === expected.tacticalType
      );
  }
};
