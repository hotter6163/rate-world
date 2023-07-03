import './globals.css';
import { SessionProvider, getServerSession } from '@/libs/auth';
import { Inter } from 'next/font/google';
import { FC, ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Rate World',
  description:
    'レートシステムを使った対戦ゲームができます。なんかちゃんと作り切ること目標。一旦ゲームとレートシステムは適当。since 2023/06/18',
};

interface Props {
  children: ReactNode;
}

const RootLayout: FC<Props> = async ({ children }) => {
  const session = await getServerSession();

  return (
    <html lang="jp">
      <body className={inter.className}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
