'use client';

import { usePusher } from './usePusher';
import { errorToast } from '@/libs/toast';

export const useUnsubscribe = () => {
  const { channel, setChannel } = usePusher();

  const unsubscribe = () => {
    if (!channel) {
      errorToast('チャンネルに接続されていません。');
      return;
    }
    channel.unsubscribe();
    setChannel(null);
  };

  return { unsubscribe };
};
