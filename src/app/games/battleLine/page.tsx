import { BattleLineArena } from '@/features/games/battleLine/component/BattleLineArena';
import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'バトルライン',
};

const BattleLinePage: FC = () => (
  <div className="h-screen w-screen">
    <BattleLineArena />
  </div>
);

export default BattleLinePage;
