import { SignInButton } from './SignInButton';
import { Logo } from '@/components/layout/Logo';
import { Metadata } from 'next';
import Link from 'next/link';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'ログイン',
};

const SignInPage: FC = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <section className="flex flex-col items-center gap-6 rounded-xl px-8 py-6 shadow-pop">
      <Logo />
      <SignInButton />
      <Link href="/">
        <p className="text-sm font-normal underline">ホームに戻る</p>
      </Link>
    </section>
  </div>
);

export default SignInPage;
