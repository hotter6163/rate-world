'use client';

import { Dialog as HeadlessDialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { FC, Fragment, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const InterceptDialog: FC<Props> = ({ children }) => {
  const router = useRouter();

  const onClose = () => router.back();

  return (
    <Transition show as={Fragment}>
      <HeadlessDialog onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <HeadlessDialog.Panel className="fixed-center">{children}</HeadlessDialog.Panel>
        </Transition.Child>
      </HeadlessDialog>
    </Transition>
  );
};
