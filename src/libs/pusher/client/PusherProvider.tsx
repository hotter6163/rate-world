'use client';

import { PusherContext } from './PusherContext';
import { connectionErrorHandler } from './handlers/connection/error';
import { connectionStateChangeHandler } from './handlers/connection/stateChange';
import { ConnectionState } from './types/ConnectionState';
import { useSession } from 'next-auth/react';
import Pusher from 'pusher-js';
import { ReactNode, useRef, useState } from 'react';

interface Props {
  children: ReactNode;
}

export const PusherProvider: React.FC<Props> = ({ children }) => {
  const pusherRef = useRef<Pusher | null>(null);
  const [state, setState] = useState(ConnectionState.Disconnected);
  const [error, setError] = useState('');
  const { status } = useSession();

  const connect = () => {
    if (pusherRef.current && pusherRef.current.connection.state !== ConnectionState.Disconnected) {
      // TODO: UIでエラーを表示する
      console.error('Pusher is already connected');
      return;
    }

    if (status !== 'authenticated') {
      // TODO: UIでエラーを表示する
      console.error('User is not authenticated');
      return;
    }

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      userAuthentication: {
        endpoint: '/api/pusher/user-auth',
        transport: 'ajax',
      },
    });

    pusher.signin();

    pusher.connection.bind('error', connectionErrorHandler(setError));
    pusher.connection.bind('state_change', connectionStateChangeHandler(setState));

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
