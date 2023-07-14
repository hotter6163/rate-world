'use client';

import { Toast, toast } from 'react-hot-toast';

type Option = Partial<
  Pick<
    Toast,
    'id' | 'icon' | 'duration' | 'position' | 'ariaProps' | 'style' | 'className' | 'iconTheme'
  >
>;

export type ToastFunction = (message: string, options?: Option) => string;

export const useToast = (): { [key: string]: ToastFunction } => ({
  notifyMessage: (message: string, options?: Option) =>
    toast(message, {
      duration: 3000,
      position: 'top-center',
      ...options,
    }),
  successMessage: (message: string, options?: Option) =>
    toast.success(message, {
      duration: 3000,
      position: 'top-center',
      ...options,
    }),
  errorMessage: (message: string, options?: Option) =>
    toast.error(message, {
      duration: 3000,
      position: 'top-center',
      ...options,
    }),
});
