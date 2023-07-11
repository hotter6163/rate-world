'use client';

import { Transition } from '@headlessui/react';
import { FC } from 'react';
import { ToastType, Toaster } from 'react-hot-toast';

export const Toast: FC = () => (
  <Toaster
    containerStyle={{
      top: 30,
      left: 16,
      bottom: 30,
      right: 16,
    }}
  >
    {({ visible, message, type }) => (
      <Transition
        appear
        show={visible}
        className="transform"
        enter="transition-all duration-150"
        enterFrom="opacity-0 scale-50"
        enterTo="opacity-100 scale-100"
        leave="transition-all duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-75"
      >
        {((type: ToastType) => {
          const text = message?.toString();
          if (!text) return null;
          switch (type) {
            case 'blank':
              return <BlankToast text={text} />;
            case 'success':
              return <SuccessToast text={text} />;
            case 'error':
              return <ErrorToast text={text} />;
            default:
              return null;
          }
        })(type)}
      </Transition>
    )}
  </Toaster>
);

interface ToastProps {
  text: string;
}

const BlankToast: FC<ToastProps> = ({ text }) => (
  <div className="toast bg-white">
    <p className="text-base font-bold">{text}</p>
  </div>
);

const SuccessToast: FC<ToastProps> = ({ text }) => (
  <div className="toast bg-success">
    <p className="text-base font-bold text-white">{text}</p>
  </div>
);

const ErrorToast: FC<ToastProps> = ({ text }) => (
  <div className="toast bg-failed">
    <p className="text-base font-bold text-white">{text}</p>
  </div>
);
