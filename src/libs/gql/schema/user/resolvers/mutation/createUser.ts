import { MutationResolvers } from '@/libs/gql/generated/resolvers-types';

export const createUserMutation: MutationResolvers['createUser'] = () => ({
  user: {
    id: '0',
    name: 'john',
    age: 5,
  },
});
