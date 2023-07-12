'use client';

import { PusherContext } from './PusherContext';
import { connectionErrorHandler } from './handlers/connection/error';
import { connectionStateChangeHandler } from './handlers/connection/stateChange';
import { ConnectionState } from './types/ConnectionState';
import { useToast } from '@/hooks/useToast';
import { graphql } from '@/libs/gql/generated';
import { useMutation } from '@apollo/client';
import { useSession } from 'next-auth/react';
import Pusher from 'pusher-js';
import { ReactNode, useRef, useState } from 'react';

const mutation = graphql(`
  mutation PusherSignin($input: AuthenticateUserInput!) {
    authenticateUser(input: $input) {
      data {
        auth
        userData
      }
    }
  }
`);

interface Props {
  children: ReactNode;
}

export const PusherProvider: React.FC<Props> = ({ children }) => {
  const pusherRef = useRef<Pusher | null>(null);
  const [state, setState] = useState(ConnectionState.Disconnected);
  const [error, setError] = useState('');
  const { status } = useSession();
  const { errorMessage, successMessage } = useToast();
  const [pusherSignin] = useMutation(mutation);

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
        endpoint: '/',
        transport: 'ajax',
        customHandler: async ({ socketId }, callback) => {
          const { data } = await pusherSignin({ variables: { input: { socketId } } });
          if (!data?.authenticateUser.data)
            return callback(new Error('認証に失敗しました。'), null);
          else {
            const { auth, userData } = data.authenticateUser.data;
            return callback(null, { auth, user_data: userData });
          }
        },
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
