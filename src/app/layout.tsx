import './globals.css';
import { Toast } from '@/components/Toast';
import { SessionProvider, getServerSession } from '@/libs/auth';
import { PusherProvider } from '@/libs/pusher/client';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { FC, ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s - Rate World（仮）',
    absolute: 'Rate World（仮）',
  },
  description:
    'レートシステムを使った対戦ゲームができます。なんかちゃんと作り切ること目標。一旦ゲームとレートシステムは適当。since 2023/06/18',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1.0',
};

interface Props {
  modal: ReactNode;
  children: ReactNode;
}

const RootLayout: FC<Props> = async ({ modal, children }) => {
  const session = await getServerSession();

  return (
    <html lang="jp">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <PusherProvider>
            {children}
            {modal}
          </PusherProvider>
        </SessionProvider>
        <Toast />
      </body>
    </html>
  );
};

export default RootLayout;
