import { QueryResolvers } from '@/libs/gql/generated/resolvers-types';

export const userQuery: QueryResolvers['user'] = () => ({
  id: '0',
  name: 'john',
  age: 5,
});
