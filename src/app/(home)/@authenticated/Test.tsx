'use client';

import {
  ConnectionState,
  useConnect,
  useDisconnect,
  useMatching,
  usePusher,
  useSubscribe,
  useUnsubscribe,
} from '@/features/socket';
import { Game } from '@/games/Game';
import { getChannelName } from '@/libs/pusher';
import { FC } from 'react';

export const Text: FC = () => {
  const { channel, state } = usePusher();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { subscribe } = useSubscribe();
  const { unsubscribe } = useUnsubscribe();
  useMatching();

  return (
    <div className="flex flex-col items-start gap-2">
      <h1>Test</h1>
      <p>{state}</p>
      {state === ConnectionState.Disconnected ? (
        <button onClick={connect}>Connect</button>
      ) : (
        <>
          {channel ? (
            <>
              <p>{channel.name}</p>
              <button onClick={() => unsubscribe()}>Unsubscribe</button>
            </>
          ) : (
            <button
              onClick={() =>
                subscribe(
                  getChannelName({ prefix: 'private', game: Game.BattleLine, id: 'matching' }),
                )
              }
            >
              Subscribe
            </button>
          )}
          <button onClick={disconnect}>Disconnect</button>
        </>
      )}
    </div>
  );
};
