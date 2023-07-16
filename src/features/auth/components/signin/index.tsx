import { BackButton } from './BackButton';
import { SignInButton } from './SignInButton';
import { Logo } from '@/components/layout/Logo';
import { FC } from 'react';

interface Props {
  isIntercept?: boolean;
}

export const SignInForm: FC<Props> = ({ isIntercept }) => (
  <section className="flex min-w-[300px] flex-col items-center gap-6 rounded-xl bg-white px-8 py-6 shadow-pop">
    <Logo />
    <SignInButton />
    <BackButton isIntercept={isIntercept} />
  </section>
);
