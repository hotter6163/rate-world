import { ToastFunction } from '@/hooks/useToast';
import { Dispatch, SetStateAction } from 'react';

export const connectionErrorHandler =
  (setError: Dispatch<SetStateAction<string>>, notify: ToastFunction) => (error: any) => {
    console.error('connection error', error);
    notify('サーバーとの接続に失敗しました。');
    if (error.error.data.code === 4004) {
      setError('Over limit!');
    }
  };
