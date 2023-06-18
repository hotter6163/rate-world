'use client';

import { signInWithLine } from '@/libs/auth/line/signInWithLine';
import { FC } from 'react';

export const SignInButton: FC = () => (
  <button onClick={() => signInWithLine()} className="rounded-lg bg-green-500 px-4 py-2 text-white">
    sign in with line
  </button>
);
