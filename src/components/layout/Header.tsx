import { Logo } from './Logo';
import { SignOutButton, getServerSession } from '@/features/auth';
import Link from 'next/link';
import { FC } from 'react';

export const Header: FC = async () => {
  const session = await getServerSession();

  return (
    <header className="sticky top-0 mb-4 flex justify-between bg-white p-4 shadow-xl">
      <Logo />
      <div className="flex items-center">
        {session ? <SignOutButton /> : <Link href="/signin">Sign In</Link>}
      </div>
    </header>
  );
};
