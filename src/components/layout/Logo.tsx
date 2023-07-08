import Link from 'next/link';
import { FC } from 'react';

export const Logo: FC = () => (
  <Link href="/">
    <p className="text-3xl font-bold">Rate World（仮）</p>
  </Link>
);
