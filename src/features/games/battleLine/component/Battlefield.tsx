'use client';

import { Battlefield as BattlefieldType, Player } from '../types';
import { Formation } from './Formation';
import clsx from 'clsx';
import { FC } from 'react';

interface Props {
  battlefield: BattlefieldType;
}

export const Battlefield: FC<Props> = ({ battlefield }) => {
  const winner: Player | null = null;

  return (
    <div className="flex flex-col items-center gap-4">
      <Formation player="opponent" formation={battlefield.opponentFormation} />
      <div
        className={clsx(
          'h-4 w-4 rounded-full',
          winner === 'myself' ? 'bg-red-500' : winner === 'opponent' ? 'bg-blue-500' : 'bg-black',
        )}
      />
      <Formation player="myself" formation={battlefield.myFormation} />
    </div>
  );
};
