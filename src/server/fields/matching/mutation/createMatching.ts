import { BattleLineStoreItem } from '@/libs/kv';
import { getChannelName, splitChannelName } from '@/libs/pusher';
import { builder } from '@/server/builder';
import { ArenaStatus, Game } from '@prisma/client';
import dayjs from 'dayjs';

interface Input {
  channelName: string;
}

const InputRef = builder.inputRef<Input>('CreateMatchingInput').implement({
  description: 'Input for creating a matching',
  fields: (t) => ({
    channelName: t.string({ required: true }),
  }),
});

interface Payload {
  result: Result | null;
  status: number;
}

const PayloadRef = builder.objectRef<Payload>('CreateMatchingPayload').implement({
  description: 'Payload for creating a matching',
  fields: (t) => ({
    result: t.field({
      type: ResultRef,
      nullable: true,
      resolve: (parent) => parent.result,
    }),
    status: t.int({ resolve: (parent) => parent.status }),
  }),
});

enum ResultType {
  SUCCESS = 'SUCCESS',
  RETRY = 'RETRY',
  TIMEOUT = 'TIMEOUT',
}

const ResultTypeRef = builder.enumType(ResultType, {
  name: 'CreateMatchingResultType',
});

interface Result {
  type: ResultType;
}

const ResultRef = builder.interfaceRef<Result>('CreateMatchingResult').implement({
  description: 'Result for creating a matching',
  fields: (t) => ({
    type: t.field({ type: ResultTypeRef }),
  }),
});

interface MatchingSuccess extends Result {
  roomId: string;
}

builder.objectRef<MatchingSuccess>('CreateMatchingSuccessResult').implement({
  description: 'Result for creating a matching',
  interfaces: [ResultRef],
  isTypeOf: (parent) => (parent as Result).type === ResultType.SUCCESS,
  fields: (t) => ({
    roomId: t.string({ resolve: (parent) => parent.roomId }),
  }),
});

interface MatchingRetry extends Result {}

builder.objectRef<MatchingRetry>('CreateMatchingRetryResult').implement({
  description: 'Result for creating a matching',
  interfaces: [ResultRef],
  isTypeOf: (parent) => (parent as Result).type === ResultType.RETRY,
});

interface MatchingTimeout extends Result {}

builder.objectRef<MatchingTimeout>('CreateMatchingTimeoutResult').implement({
  description: 'Result for creating a matching',
  interfaces: [ResultRef],
  isTypeOf: (parent) => (parent as Result).type === ResultType.TIMEOUT,
});

builder.mutationField('createMatching', (t) =>
  t.field({
    type: PayloadRef,
    args: { input: t.arg({ type: InputRef, required: true }) },
    resolve: async (
      _,
      { input: { channelName } },
      { token, dataSources: { session, arena }, kv, pusher },
    ) => {
      if (!token) return { result: null, status: 400 };
      const channel = splitChannelName(channelName);
      if (channel.prefix !== 'private') return { result: null, status: 400 };

      const [matchingData, userId] = await Promise.all([
        kv.lrange<BattleLineStoreItem>(channel.game, 0, -1),
        session
          .findUnique({ select: { userId: true }, where: { sessionToken: token } })
          .then((session) => session?.userId),
      ]);

      if (!userId) return { result: null, status: 400 };
      const user = matchingData.find((item) => item.user.id === userId);
      if (!user) return { result: null, status: 400 };

      const opponents = matchingData.filter(
        (item) => item.user.id !== userId && dayjs().isBefore(item.timeoutAt),
      );
      if (opponents.length === 0) {
        const isTimeout = dayjs().isAfter(user.timeoutAt);
        if (isTimeout) {
          await kv.lrem(channel.game, 0, user);
          return { result: { type: ResultType.TIMEOUT }, status: 200 };
        } else {
          return { result: { type: ResultType.RETRY }, status: 200 };
        }
      }

      const opponent = opponents[Math.floor(Math.random() * opponents.length)];
      const arenaId = await Promise.allSettled([
        arena
          .create({
            data: {
              game: Game.BATTLE_LINE,
              status: ArenaStatus.MATCHING,
              participants: {
                create: [
                  {
                    participantId: user.user.id,
                    matchRating: user.rate,
                  },
                  {
                    participantId: opponent.user.id,
                    matchRating: opponent.rate,
                  },
                ],
              },
            },
          })
          .then((result) => result.id),
        kv.lrem(channel.game, 0, user),
        kv.lrem(channel.game, 0, opponent),
      ]).then((result) => {
        if (result[0].status === 'rejected') {
          return Promise.all([
            new Promise((resolve) =>
              result[1].status === 'fulfilled' ? kv.lpush(channel.game, user) : resolve(-1),
            ),
            new Promise((resolve) =>
              result[2].status === 'fulfilled' ? kv.lpush(channel.game, opponent) : resolve(-1),
            ),
          ]).then(() => null);
        } else {
          return result[0].value;
        }
      });

      if (!arenaId) return { result: null, status: 400 };
      const roomId = getChannelName({ prefix: 'presence', game: channel.game, id: arenaId });
      await pusher.sendToUser(opponent.user.id, 'matched', { roomId });
      return {
        result: { type: ResultType.SUCCESS, roomId },
        status: 200,
      };
    },
  }),
);
