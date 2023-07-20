'use client';

import { channelSubscriptionErrorHandler } from '../handlers/channel/subscriptionError';
import { channelSubscriptionSucceededHandler } from '../handlers/channel/subscriptionSucceeded';
import { usePusher } from './usePusher';
import { errorToast, successToast } from '@/libs/toast';

export const useSubscribe = () => {
  const { pusher, channel, setChannel } = usePusher();

  const subscribe = (channelName: string, force: boolean = false) => {
    if (!pusher) {
      errorToast('サーバーに接続されていません。');
      return;
    }
    if (channel && !force) {
      errorToast('チャンネルに接続されています。');
      return;
    }

    if (channel) {
      channel.unsubscribe();
    }

    const existedChannel = pusher.channel(channelName);
    if (existedChannel) {
      existedChannel.subscribe();
    } else {
      const newChannel = pusher.subscribe(channelName);
      newChannel.bind(
        'pusher:subscription_succeeded',
        channelSubscriptionSucceededHandler(channelName, () => {
          setChannel(newChannel);
          successToast('チャンネルに接続されました。');
        }),
      );
      newChannel.bind('pusher:subscription_error', channelSubscriptionErrorHandler());
    }
  };

  return { subscribe };
};
