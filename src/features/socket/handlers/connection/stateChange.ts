import { ConnectionState } from '../../types/ConnectionState';
import { ToastFunction } from '@/hooks/useToast';
import { Dispatch, SetStateAction } from 'react';

export const connectionStateChangeHandler =
  (setState: Dispatch<SetStateAction<ConnectionState>>, notify: ToastFunction) =>
  (states: { previous: ConnectionState; current: ConnectionState }) => {
    console.info(`Previous state: ${states.previous}, Current state: ${states.current}`);
    setState(states.current);
    if (states.current === 'connected') {
      notify('サーバーとの接続に成功しました。');
    }
    if (states.current === 'disconnected') {
      notify('サーバーとの接続が切断されました。');
    }
  };
