import { errorToast } from '@/libs/toast';

export const channelSubscriptionErrorHandler =
  () =>
  ({ error }: { type: 'AuthError'; error: string }) => {
    errorToast(error);
  };
