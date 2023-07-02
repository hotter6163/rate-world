import { MutationResolvers } from '@/libs/gql/generated/resolvers-types';

export const createUserMutation: MutationResolvers['createUser'] = (
  _,
  { input },
  { dataSources: { user } },
) =>
  user.findUnique({ where: { email: input.email } }).then((user) => {
    if (!user) throw new Error('User not found');
    return { user };
  });
