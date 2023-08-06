'use client';

import { Card as CardType } from '../types';
import { FC } from 'react';

interface Props {
  card: CardType;
}

export const Card: FC<Props> = ({ card }) =>
  card.type === 'UNIT' ? (
    <div className="h-full w-full rounded-lg border border-solid border-gray-300 bg-white shadow-xl">
      <div className="px-2 py-4 text-center">
        <p className="text-base">{card.color}</p>
        <p className="text-base">{card.value}</p>
      </div>
    </div>
  ) : (
    <div className="h-full w-full rounded-lg border border-solid border-gray-300 bg-white shadow-xl">
      <div className="px-2 py-4 text-center">
        <p className="text-base leading-[3rem]">{card.tacticalType}</p>
      </div>
    </div>
  );
