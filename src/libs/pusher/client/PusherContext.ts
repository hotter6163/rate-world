'use client';

import { ConnectionState } from './types/ConnectionState';
import { createContext } from 'react';

interface Context {
  state: ConnectionState;
  error: string;
  connect: () => void;
  disconnect: () => void;
  subscribe: (channel: string) => void;
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
  subscribe: () => {
    throw new Error('Subscribe function must be overridden');
  },
});
