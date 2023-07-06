import { SignInForm } from '@/features/auth/signin';
import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'ログイン',
};

const SignInPage: FC = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <SignInForm />
  </div>
);

export default SignInPage;
