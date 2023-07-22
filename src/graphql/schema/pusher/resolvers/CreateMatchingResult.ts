import {
  CreateMatchingResultResolvers,
  CreateMatchingResultType,
} from '@/graphql/generated/resolvers-types';

export const CreateMatchingResult: CreateMatchingResultResolvers = {
  __resolveType: ({ type }) => {
    switch (type) {
      case CreateMatchingResultType.Success:
        return 'MatchingSuccess';
      case CreateMatchingResultType.Retry:
        return 'MatchingRetry';
      case CreateMatchingResultType.Timeout:
        return 'MatchingTimeout';
    }
  },
};
