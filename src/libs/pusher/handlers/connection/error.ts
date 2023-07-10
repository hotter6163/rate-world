import { Dispatch, SetStateAction } from 'react';

export const connectionErrorHandler =
  (setError: Dispatch<SetStateAction<string>>) => (error: any) => {
    // TODO: UIでエラーを表示する
    console.error('connection error', error);
    if (error.error.data.code === 4004) {
      setError('Over limit!');
    }
  };
