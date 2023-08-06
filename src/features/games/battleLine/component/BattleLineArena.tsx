'use client';

import { useBattleLineStore } from '../store';
import { Battlefields } from './Battlefields';
import { Hands } from './Hands';
import { FC, useEffect } from 'react';

export const BattleLineArena: FC = () => {
  const setup = useBattleLineStore((state) => state.setup);

  useEffect(() => {
    setup();
  }, [setup]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8">
      <Hands player="opponent" />
      <Battlefields />
      <Hands player="myself" />
    </div>
  );
};
