import { Logo } from '../layout/Logo';
import { SignInButton } from './SignInButton';
import Link from 'next/link';

export const SignInForm = () => (
  <section className="flex flex-col items-center gap-6 rounded-xl px-8 py-6 shadow-pop">
    <Logo />
    <SignInButton />
    <Link href="/">
      <p className="text-sm font-normal underline">ホームに戻る</p>
    </Link>
  </section>
);
