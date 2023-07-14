import { getServerSession } from '@/features/auth';
import { redirect } from 'next/navigation';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const UnauthenticatedLayout: FC<Props> = async ({ children }) => {
  const session = await getServerSession();

  if (session) return redirect('/');
  else return <>{children}</>;
};

export default UnauthenticatedLayout;
