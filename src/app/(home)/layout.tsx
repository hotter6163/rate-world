import { getServerSession } from '@/libs/auth/common/getServerSession';
import { apolloClient } from '@/libs/gql/client';
import { graphql } from '@/libs/gql/generated';
import { FC, ReactNode } from 'react';

interface Props {
  authenticated: ReactNode;
  unauthenticated: ReactNode;
}

const ExampleQueryQuery = graphql(/* GraphQL */ `
  query ExampleQuery($id: String!) {
    user(id: $id) {
      id
      name
      age
    }
  }
`);

const HomeLayout: FC<Props> = async ({ authenticated, unauthenticated }) => {
  const session = await getServerSession();
  const { data, error } = await apolloClient.query({
    query: ExampleQueryQuery,
    variables: {
      id: '1',
    },
  });

  return <>{session ? authenticated : unauthenticated}</>;
};

export default HomeLayout;
