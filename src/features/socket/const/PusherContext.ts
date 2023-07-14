'use client';

import { ConnectionState } from '../types/ConnectionState';
import { CallEventData } from '@/graphql/generated/graphql';
import { Channel } from 'pusher-js';
import { createContext } from 'react';

interface Context {
  channel: Channel | null;
  state: ConnectionState;
  error: string;
  connect: () => void;
  disconnect: () => void;
  subscribe: (channel: string) => void;
  unsubscribe: () => void;
  triggerEvent: (event: string, data?: CallEventData[], isSocketIdToSend?: boolean) => void;
}

export const PusherContext = createContext<Context>({
  channel: null,
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
  unsubscribe: () => {
    throw new Error('Unsubscribe function must be overridden');
  },
  triggerEvent: () => {
    throw new Error('TriggerEvent function must be overridden');
  },
});
