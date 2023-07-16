import { errorToast } from '@/libs/toast';

export const connectionErrorHandler = () => (error: any) => {
  console.error('connection error', error);
  errorToast('サーバーとの接続に失敗しました。');
};
