import { channelSubscriptionErrorHandler } from './subscriptionError';
import { channelSubscriptionSucceededHandler } from './subscriptionSucceeded';
import { successToast } from '@/libs/toast';
import { Channel } from 'pusher-js';
import { Dispatch, SetStateAction } from 'react';

interface Options {
  channelName: string;
  setChannel: Dispatch<SetStateAction<Channel | null>>;
}

export const setupChannelCommon = (channel: Channel, { channelName, setChannel }: Options) => {
  const handlers = [
    {
      event: 'pusher:subscription_succeeded',
      handler: channelSubscriptionSucceededHandler(channelName, () => {
        setChannel(channel);
        successToast('チャンネルに接続されました。');
      }),
    },
    {
      event: 'pusher:subscription_error',
      handler: channelSubscriptionErrorHandler(),
    },
    {
      event: 'test',
      handler: (data: any) => console.log(data),
    },
  ];

  handlers.forEach(({ event, handler }) => {
    channel.bind(event, handler);
  });
};
