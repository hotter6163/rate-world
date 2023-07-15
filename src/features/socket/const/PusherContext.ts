'use client';

import { ConnectionState } from '../types/ConnectionState';
import PusherJs, { Channel } from 'pusher-js';
import { Dispatch, SetStateAction, createContext } from 'react';

interface Context {
  pusher: PusherJs | null;
  channel: Channel | null;
  state: ConnectionState;
  setPusher: Dispatch<SetStateAction<PusherJs | null>>;
  setChannel: Dispatch<SetStateAction<Channel | null>>;
  setState: Dispatch<SetStateAction<ConnectionState>>;
}

export const PusherContext = createContext<Context>({
  pusher: null,
  channel: null,
  state: ConnectionState.Disconnected,
  setPusher: () => {
    throw new Error('SetPusher function must be overridden');
  },
  setChannel: () => {
    throw new Error('SetChannel function must be overridden');
  },
  setState: () => {
    throw new Error('setState function must be overridden');
  },
});
