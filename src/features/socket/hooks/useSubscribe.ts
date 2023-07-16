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
    setupChannelCommon(channel, { channelName, setChannel });
  };

  return { subscribe };
};
