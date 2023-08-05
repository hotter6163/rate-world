'use client';

import { useBattleLineStore } from '../store';
import { Player } from '../types';
import { Card } from './Card';
import clsx from 'clsx';
import { FC } from 'react';

interface Props {
  player: Player;
}

export const Hands: FC<Props> = ({ player }) => {
  const hands = useBattleLineStore((store) =>
    player === 'myself' ? store.myHands : store.opponentHands,
  );

  return (
    <div className={clsx('grid grid-cols-7 gap-4', player === 'myself' ? '' : 'rotate-180')}>
      {hands.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </div>
  );
};
