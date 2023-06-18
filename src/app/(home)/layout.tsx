import { getServerSession } from '@/libs/auth/common/getServerSession';
import { FC, ReactNode } from 'react';

interface Props {
  private: ReactNode;
  public: ReactNode;
}

const HomeLayout: FC<Props> = async ({ private: Private, public: Public }) => {
  const session = await getServerSession();

  return <>{session ? Private : Public}</>;
};

export default HomeLayout;
