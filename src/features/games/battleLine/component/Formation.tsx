'use client';

import { Card as CardType, Player } from '../types';
import { Card } from './Card';
import clsx from 'clsx';
import { FC } from 'react';

interface Props {
  player: Player;
  formation: CardType[];
}

export const Formation: FC<Props> = ({ player, formation }) => (
  <div className={clsx('flex flex-col items-center', player === 'myself' ? '' : 'rotate-180')}>
    {formation.map((card, index) => (
      <div key={index} className="-mt-10 first:mt-0">
        <Card card={card} />
      </div>
    ))}
    {Array(4 - formation.length)
      .fill(null)
      .map((_, index) => (
        <div key={index} className="-mt-10 first:mt-0">
          <div className="h-20" />
        </div>
      ))}
  </div>
);
