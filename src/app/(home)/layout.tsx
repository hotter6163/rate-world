import { getServerSession } from '@/libs/auth/common/getServerSession';
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

  return <>{session ? authenticated : unauthenticated}</>;
};

export default HomeLayout;
