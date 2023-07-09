'use client';

import { ConnectionState } from './ConnectionState';
import { PusherContext } from './PusherContext';
import { setupPusher } from './setupPusher';
import Pusher from 'pusher-js';
import { ReactNode, useState } from 'react';

interface Props {
  children: ReactNode;
}

export const PusherProvider: React.FC<Props> = ({ children }) => {
  const [pusher, setPusher] = useState<Pusher | null>(null);
  const [state, setState] = useState(ConnectionState.Disconnected);
  const [error, setError] = useState('');

  const connect = () => {
    if (pusher && pusher.connection.state !== ConnectionState.Disconnected) {
      // TODO: UIでエラーを表示する
      console.error('Pusher is already connected');
      return;
    }

    const newPusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });
    setupPusher({
      pusher: newPusher,
      setState,
      setError,
    });
    setPusher(newPusher);
  };

  const disconnect = () => {
    if (!pusher) {
      // TODO: UIでエラーを表示する
      console.error('Pusher is not connected');
      return;
    }
    pusher.disconnect();
    setPusher(null);
  };

  return (
    <PusherContext.Provider
      value={{
        state,
        error,
        connect,
        disconnect,
      }}
    >
      {children}
    </PusherContext.Provider>
  );
};
