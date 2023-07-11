'use client';

import { ConnectionState } from './types/ConnectionState';
import { createContext } from 'react';

interface Context {
  state: ConnectionState;
  error: string;
  connect: () => void;
  disconnect: () => void;
  signin: () => void;
}

export const PusherContext = createContext<Context>({
  state: ConnectionState.Disconnected,
  error: '',
  connect: () => {
    throw new Error('Connect function must be overridden');
  },
  disconnect: () => {
    throw new Error('Disconnect function must be overridden');
  },
  signin: () => {
    throw new Error('Signin function must be overridden');
  },
});
