export type MatchingResult =
  | {
      type: 'SUCCESS';
      roomId: string;
    }
  | {
      type: 'RETRY';
    }
  | {
      type: 'TIMEOUT';
    };
