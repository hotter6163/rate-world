'use client';

import { useBattleLineStore } from '../store';
import { Battlefield } from './Battlefield';
import { FC } from 'react';

export const Battlefield: FC = () => {
  const battlefields = useBattleLineStore((store) => store.battlefields);

  return (
    <div className="flex items-center justify-center gap-4 rounded-[15%/30%] border-8 border-gray-700 bg-green-200 px-8 py-4 shadow-2xl">
      <div className="rounded-lg border border-solid border-gray-300 bg-white px-2 py-4 shadow-xl">
        <p className="">戦術カード</p>
      </div>
      <div className="grid grid-cols-9 items-center gap-4">
        {battlefields.map((battlefield, index) => (
          <Battlefield key={index} battlefield={battlefield} />
        ))}
      </div>
      <div className="rounded-lg border border-solid border-gray-300 bg-white px-2 py-4 shadow-xl">
        <p className="">部隊カード</p>
      </div>
    </div>
  );
};
