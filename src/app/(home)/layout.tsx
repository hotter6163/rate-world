import { Header } from '@/components/layout/Header';
import { getServerSession } from '@/features/auth/utils/getServerSession';
import { graphql } from '@/libs/gql/generated';
import { FC, ReactNode } from 'react';

interface Props {
  authenticated: ReactNode;
  unauthenticated: ReactNode;
}

const query = graphql(`
  query TestQuery($id: ID!) {
    user(id: $id) {
      id
    }
  }
`);

const HomeLayout: FC<Props> = async ({ authenticated, unauthenticated }) => {
  const session = await getServerSession();

  return (
    <>
      <Header />
      <div className="mx-auto max-w-6xl">{session ? authenticated : unauthenticated}</div>
    </>
  );
};

export default HomeLayout;
