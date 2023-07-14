import { ConnectionState } from '../../types/ConnectionState';
import { successToast } from '@/libs/toast';
import { Dispatch, SetStateAction } from 'react';

export const connectionStateChangeHandler =
  (setState: Dispatch<SetStateAction<ConnectionState>>) =>
  (states: { previous: ConnectionState; current: ConnectionState }) => {
    console.info(`Previous state: ${states.previous}, Current state: ${states.current}`);
    setState(states.current);
    if (states.current === 'connected') {
      successToast('サーバーとの接続に成功しました。');
    }
    if (states.current === 'disconnected') {
      successToast('サーバーとの接続が切断されました。');
    }
  };
