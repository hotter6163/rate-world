import { ToastFunction } from '@/hooks/useToast';

export const channelSubscriptionErrorHandler =
  (notify: ToastFunction) =>
  ({ error }: { type: 'AuthError'; error: string }) => {
    notify(error);
  };
