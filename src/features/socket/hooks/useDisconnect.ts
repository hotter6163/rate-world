'use client';

import { usePusher } from './usePusher';
import { errorToast } from '@/libs/toast';

export const useDisconnect = () => {
  const { pusher, channel, setPusher, setChannel } = usePusher();

  const disconnect = () => {
    if (!pusher) {
      errorToast('サーバーに接続されていません。');
      return;
    }
    if (channel) {
      channel.unsubscribe();
      setChannel(null);
    }
    pusher.disconnect();
    setPusher(null);
  };

  return { disconnect };
};
