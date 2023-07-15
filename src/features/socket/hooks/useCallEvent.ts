'use client';

import { usePusher } from './usePusher';
import { graphql } from '@/graphql/generated';
import { CallEventData } from '@/graphql/generated/resolvers-types';
import { errorToast } from '@/libs/toast';
import { useMutation } from '@apollo/client';
import { useAsyncCallback } from 'react-async-hook';

const mutation = graphql(`
  mutation CallEvent($input: CallEventInput!) {
    callEvent(input: $input) {
      success
      message
    }
  }
`);

export const useCallEvent = () => {
  const { pusher, channel } = usePusher();
  const [call] = useMutation(mutation, {
    fetchPolicy: 'no-cache',
  });
  const { execute: callEvent, ...others } = useAsyncCallback(
    async (
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
            socketId: isSocketIdToSend ? pusher?.connection.socket_id ?? null : null,
          },
        },
      });
      if (!result?.callEvent.success)
        errorToast(result?.callEvent.message ?? 'エラーが発生しました。');
    },
  );

  return { callEvent, ...others };
};
