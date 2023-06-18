import { getServerSession } from '@/libs/auth/common/getServerSession';
import { redirect } from 'next/navigation';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const AuthLayout: FC<Props> = async ({ children }) => {
  const session = await getServerSession();

  if (session) return redirect('/');
  else return <>{children}</>;
};

export default AuthLayout;
