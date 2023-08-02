'use client';

import { matchingMatchedHandler } from '../handlers/matching/matched';
import { usePusher } from './usePusher';
import { useSubscribe } from './useSubscribe';
import { useUnsubscribe } from './useUnsubscribe';
import { graphql } from '@/graphql/generated';
import { splitChannelName } from '@/libs/pusher';
import { useMutation } from '@apollo/client';
import { useEffect } from 'react';

const mutation = graphql(`
  mutation CreateMatching($input: CreateMatchingInput!) {
    createMatching(input: $input) {
      result {
        type
        ... on CreateMatchingSuccessResult {
          roomId
        }
      }
    }
  }
`);

export const useMatching = () => {
  const { pusher, channel } = usePusher();
  const { subscribe } = useSubscribe();
  const { unsubscribe } = useUnsubscribe();
  const [matching] = useMutation(mutation, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (!pusher) return;
    if (!channel) return;
    const { id } = splitChannelName(channel.name);
    if (id !== 'matching') return;

    const callback = async () => {
      const { data } = await matching({
        variables: {
          input: {
            channelName: channel.name,
          },
        },
      });

      switch (data?.createMatching.result?.__typename) {
        case 'CreateMatchingSuccessResult':
          console.log('MatchingSuccess', data.createMatching.result.roomId);
          subscribe(data.createMatching.result.roomId, true);
          break;
        case 'CreateMatchingRetryResult':
          break;
        case 'CreateMatchingTimeoutResult':
          unsubscribe();
          break;
      }
    };
    const interval = setInterval(callback, 1000 * 10);

    const matchedHandler = matchingMatchedHandler((roomId) => {
      console.info(`Matched: ${roomId}`);
      subscribe(roomId, true);
      clearInterval(interval);
    });
    pusher.user.bind('matched', matchedHandler);

    return () => {
      pusher.user.unbind('matched', matchedHandler);
      clearInterval(interval);
    };
  }, [pusher, channel]);
};
