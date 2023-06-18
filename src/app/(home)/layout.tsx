import { getServerSession } from '@/libs/auth/common/getServerSession';
import { FC, ReactNode } from 'react';

interface Props {
  authenticated: ReactNode;
  unauthenticated: ReactNode;
}

const HomeLayout: FC<Props> = async ({ authenticated, unauthenticated }) => {
  const session = await getServerSession();

  return <>{session ? authenticated : unauthenticated}</>;
};

export default HomeLayout;
