import { errorToast } from '@/libs/toast';
import { Dispatch, SetStateAction } from 'react';

export const connectionErrorHandler =
  (setError: Dispatch<SetStateAction<string>>) => (error: any) => {
    console.error('connection error', error);
    errorToast('サーバーとの接続に失敗しました。');
    if (error.error.data.code === 4004) {
      setError('Over limit!');
    }
  };
