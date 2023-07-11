'use client';

import { Toast, toast } from 'react-hot-toast';

type Option = Partial<
  Pick<
    Toast,
    'id' | 'icon' | 'duration' | 'position' | 'ariaProps' | 'style' | 'className' | 'iconTheme'
  >
>;

export const useToast = () => ({
  notifyMessage: (message: string, options?: Option) =>
    toast(message, {
      duration: 3000,
      position: 'top-center',
      ...options,
    }),
  successMessage: (message: string, options?: Option) =>
    toast.success(message, {
      duration: 3000,
      position: 'bottom-center',
      ...options,
    }),
  errorMessage: (message: string, options?: Option) =>
    toast.error(message, {
      duration: 3000,
      position: 'bottom-center',
      ...options,
    }),
});
