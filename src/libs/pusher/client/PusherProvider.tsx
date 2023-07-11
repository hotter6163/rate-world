'use client';

import { PusherContext } from './PusherContext';
import { connectionErrorHandler } from './handlers/connection/error';
import { connectionStateChangeHandler } from './handlers/connection/stateChange';
import { ConnectionState } from './types/ConnectionState';
import { useToast } from '@/hooks/useToast';
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
  const { errorMessage, successMessage } = useToast();

  const connect = () => {
    if (pusherRef.current && pusherRef.current.connection.state !== ConnectionState.Disconnected) {
      errorMessage('既にサーバーに接続されています。');
      return;
    }

    if (status !== 'authenticated') {
      errorMessage('ログインしてください。');
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

    pusher.connection.bind('error', connectionErrorHandler(setError, errorMessage));
    pusher.connection.bind('state_change', connectionStateChangeHandler(setState, successMessage));

    pusherRef.current = pusher;
  };

  const disconnect = () => {
    if (!pusherRef.current) {
      errorMessage('サーバーに接続されていません。');
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
