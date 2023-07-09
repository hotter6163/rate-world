'use client';

import { ConnectionState } from './ConnectionState';
import { PusherContext } from './PusherContext';
import { setupPusher } from './setupPusher';
import Pusher from 'pusher-js';
import { ReactNode, useRef, useState } from 'react';

interface Props {
  children: ReactNode;
}

export const PusherProvider: React.FC<Props> = ({ children }) => {
  const pusherRef = useRef<Pusher | null>(null);
  const [state, setState] = useState(ConnectionState.Disconnected);
  const [error, setError] = useState('');

  const connect = () => {
    if (pusherRef.current && pusherRef.current.connection.state !== ConnectionState.Disconnected) {
      // TODO: UIでエラーを表示する
      console.error('Pusher is already connected');
      return;
    }

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });
    setupPusher({
      pusher,
      setState,
      setError,
    });
    pusherRef.current = pusher;
  };

  const disconnect = () => {
    if (!pusherRef.current) {
      // TODO: UIでエラーを表示する
      console.error('Pusher is not connected');
      return;
    }
    pusherRef.current.disconnect();
    pusherRef.current = null;
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
