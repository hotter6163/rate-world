'use client';

import { setupChannelCommon } from '../handlers/channel';
import { usePusher } from './usePusher';
import { errorToast } from '@/libs/toast';

export const useSubscribe = () => {
  const { pusher, setChannel } = usePusher();

  const subscribe = (channelName: string) => {
    if (!pusher) {
      errorToast('サーバーに接続されていません。');
      return;
    }
    const channel = pusher.subscribe(channelName);
    const existedChannel = pusher.channel(channelName);
    if (existedChannel) {
      existedChannel.subscribe();
    } else {
      const newChannel = pusher.subscribe(channelName);
      newChannel.bind(
        'pusher:subscription_succeeded',
        channelSubscriptionSucceededHandler(channelName, () => {
          setChannel(channel);
          successToast('チャンネルに接続されました。');
        }),
      );
      newChannel.bind('pusher:subscription_error', channelSubscriptionErrorHandler());
    }
  };

  return { subscribe };
};
