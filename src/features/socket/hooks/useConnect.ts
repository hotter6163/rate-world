'use client';

import { connectionErrorHandler } from '../handlers/connection/error';
import { connectionStateChangeHandler } from '../handlers/connection/stateChange';
import { ConnectionState } from '../types/ConnectionState';
import { usePusher } from './usePusher';
import { graphql } from '@/graphql/generated';
import { errorToast } from '@/libs/toast';
import { useMutation } from '@apollo/client';
import { useSession } from 'next-auth/react';
import Pusher from 'pusher-js';

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

export const useConnect = () => {
  const { pusher, setPusher, setState } = usePusher();
  const { status } = useSession();
  const [authenticate] = useMutation(authenticateUser, {
    fetchPolicy: 'no-cache',
  });
  const [authorize] = useMutation(authorizeChannel, {
    fetchPolicy: 'no-cache',
  });

  const connect = () => {
    if (pusher && pusher.connection.state !== ConnectionState.Disconnected) {
      errorToast('既にサーバーに接続されています。');
      return;
    }

    if (status !== 'authenticated') {
      errorToast('ログインしてください。');
      return;
    }

    const newPusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
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

    newPusher.signin();
    newPusher.connection.bind('state_change', connectionStateChangeHandler(setState));
    newPusher.connection.bind('error', connectionErrorHandler());
    setPusher(newPusher);
  };

  return { connect };
};
