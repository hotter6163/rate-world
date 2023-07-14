'use client';

import { PusherContext } from '../const/PusherContext';
import { channelSubscriptionErrorHandler } from '../handlers/channel/subscriptionError';
import { channelSubscriptionSucceededHandler } from '../handlers/channel/subscriptionSucceeded';
import { connectionErrorHandler } from '../handlers/connection/error';
import { connectionStateChangeHandler } from '../handlers/connection/stateChange';
import { ConnectionState } from '../types/ConnectionState';
import { graphql } from '@/graphql/generated';
import { CallEventData } from '@/graphql/generated/graphql';
import { errorToast, successToast } from '@/libs/toast';
import { useMutation } from '@apollo/client';
import { useSession } from 'next-auth/react';
import Pusher, { Channel } from 'pusher-js';
import { ReactNode, useEffect, useRef, useState } from 'react';

const authenticateUser = graphql(`
  mutation AuthenticateUser($input: AuthenticateUserInput!) {
    authenticateUser(input: $input) {
      data {
        auth
        userData
      }
    }
  }
`);

const authorizeChannel = graphql(`
  mutation AuthorizeChannel($input: AuthorizeChannelInput!) {
    authorizeChannel(input: $input) {
      data {
        auth
        channelData
        sharedSecret
      }
    }
  }
`);

const callEvent = graphql(`
  mutation CallEvent($input: CallEventInput!) {
    callEvent(input: $input) {
      success
      message
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
  const [channel, setChannel] = useState<Channel | null>(null);
  const { status } = useSession();
  const [authenticate] = useMutation(authenticateUser, {
    fetchPolicy: 'no-cache',
  });
  const [authorize] = useMutation(authorizeChannel, {
    fetchPolicy: 'no-cache',
  });
  const [call] = useMutation(callEvent, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    console.log(channel);
  }, [channel]);

  const connect = () => {
    if (pusherRef.current && pusherRef.current.connection.state !== ConnectionState.Disconnected) {
      errorToast('既にサーバーに接続されています。');
      return;
    }

    if (status !== 'authenticated') {
      errorToast('ログインしてください。');
      return;
    }

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      userAuthentication: {
        endpoint: '/',
        transport: 'ajax',
        customHandler: async ({ socketId }, callback) => {
          const { data } = await authenticate({ variables: { input: { socketId } } });
          if (!data?.authenticateUser.data)
            return callback(new Error('認証に失敗しました。'), null);
          else {
            const { auth, userData } = data.authenticateUser.data;
            return callback(null, { auth, user_data: userData });
          }
        },
      },
      channelAuthorization: {
        endpoint: '/',
        transport: 'ajax',
        customHandler: async ({ socketId, channelName }, callback) => {
          const { data } = await authorize({
            variables: { input: { socketId, channelName } },
          });
          if (!data?.authorizeChannel.data)
            return callback(new Error('認可に失敗しました。'), null);
          else {
            const { auth, channelData, sharedSecret } = data.authorizeChannel.data;
            return callback(null, {
              auth,
              channel_data: channelData ?? undefined,
              shared_secret: sharedSecret ?? undefined,
            });
          }
        },
      },
    });

    pusher.signin();

    pusher.connection.bind('error', connectionErrorHandler(setError));
    pusher.connection.bind('state_change', connectionStateChangeHandler(setState));

    pusherRef.current = pusher;
  };

  const disconnect = () => {
    if (!pusherRef.current) {
      errorToast('サーバーに接続されていません。');
      return;
    }
    unsubscribe();
    pusherRef.current.disconnect();
    pusherRef.current = null;
  };

  const subscribe = (channelName: string) => {
    if (!pusherRef.current) {
      errorToast('サーバーに接続されていません。');
      return;
    }
    const channel = pusherRef.current.subscribe(channelName);
    channel.bind(
      'pusher:subscription_succeeded',
      channelSubscriptionSucceededHandler(channelName, () => {
        setChannel(channel);
        successToast('チャンネルに接続されました。');
      }),
    );
    channel.bind('pusher:subscription_error', channelSubscriptionErrorHandler);
    channel.bind('test', (data: any) => console.log(data));
  };

  const unsubscribe = () => {
    if (!channel) {
      errorToast('チャンネルに接続されていません。');
      return;
    }
    channel.unsubscribe();
    setChannel(null);
  };

  const triggerEvent = async (
    event: string,
    data: CallEventData[] | null = null,
    isSocketIdToSend: boolean = true,
  ) => {
    if (!channel) {
      errorToast('チャンネルに接続されていません。');
      return;
    }
    const { data: result } = await call({
      variables: {
        input: {
          channel: channel.name,
          event,
          data,
          socketId: isSocketIdToSend ? pusherRef.current?.connection.socket_id ?? null : null,
        },
      },
    });
    if (!result?.callEvent.success)
      errorToast(result?.callEvent.message ?? 'エラーが発生しました。');
  };

  return (
    <PusherContext.Provider
      value={{
        channel,
        state,
        error,
        connect,
        disconnect,
        subscribe,
        unsubscribe,
        triggerEvent,
      }}
    >
      {children}
    </PusherContext.Provider>
  );
};
