import { Toast, toast } from 'react-hot-toast';

type Option = Partial<
  Pick<
    Toast,
    'id' | 'icon' | 'duration' | 'position' | 'ariaProps' | 'style' | 'className' | 'iconTheme'
  >
>;

const baseFunction =
  (callback: (message: string, options?: Option) => string) =>
  (message: string, options?: Option) =>
    callback(message, {
      duration: 3000,
      position: 'top-center',
      ...options,
    });

export const notifyToast = baseFunction(toast);

export const successToast = baseFunction(toast.success);

export const errorToast = baseFunction(toast.error);
