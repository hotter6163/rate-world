'use client';

import { signOut } from 'next-auth/react';
import { FC } from 'react';

export const SignOutButton: FC = () => <button onClick={() => signOut()}>Sign Out</button>;
