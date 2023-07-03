'use client';

import { signOut } from '@/libs/auth';
import { FC } from 'react';

export const SignOutButton: FC = () => <button onClick={() => signOut()}>Sign Out</button>;
