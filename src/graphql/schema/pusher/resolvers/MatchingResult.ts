import { MatchingResultResolvers } from '@/graphql/generated/resolvers-types';

export const MatchingResult: MatchingResultResolvers = {
  __resolveType: ({ type }) => {
    switch (type) {
      case 'SUCCESS':
        return 'MatchingSuccess';
      case 'RETRY':
        return 'MatchingRetry';
      case 'TIMEOUT':
        return 'MatchingTimeout';
    }
  },
};
