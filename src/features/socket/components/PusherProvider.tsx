'use client';

import { PusherContext } from '../const/PusherContext';
import { ConnectionState } from '../types/ConnectionState';
import Pusher, { Channel } from 'pusher-js';
import { ReactNode, useState } from 'react';

interface Props {
  children: ReactNode;
}

export const PusherProvider: React.FC<Props> = ({ children }) => {
  const [pusher, setPusher] = useState<Pusher | null>(null);
  const [channel, setChannel] = useState<Channel | null>(null);
  const [state, setState] = useState(ConnectionState.Disconnected);

  return (
    <PusherContext.Provider
      value={{
        pusher,
        channel,
        state,
        setPusher,
        setChannel,
        setState,
      }}
    >
      {children}
    </PusherContext.Provider>
  );
};
