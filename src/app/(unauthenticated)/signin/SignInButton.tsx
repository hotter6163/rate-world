'use client';

import { signInWithLine } from '@/libs/auth';
import { FC } from 'react';

export const SignInButton: FC = () => (
  <button onClick={() => signInWithLine()} className="rounded-xl bg-green-500 px-4 py-2 text-white">
    LINEでログイン
  </button>
);
