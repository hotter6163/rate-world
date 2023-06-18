import './globals.css';
import { SessionProvider } from '@/libs/auth/common/SessionProvider';
import { getServerSession } from '@/libs/auth/common/getServerSession';
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
        <SessionProvider session={session}>
          <div className="mx-auto min-h-screen max-w-md bg-white drop-shadow-2xl">{children}</div>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
