'use client';

import { ConnectionState, usePusher } from '@/libs/pusher/client';
import { FC } from 'react';

export const Text: FC = () => {
  const { channel, state, connect, disconnect, subscribe, unsubscribe, triggerEvent } = usePusher();

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
              <button
                onClick={() =>
                  triggerEvent('test', [{ key: 'message', value: 'Hello, Pusher event!' }], false)
                }
              >
                Trigger Event
              </button>
              <button onClick={() => unsubscribe()}>Unsubscribe</button>
            </>
          ) : (
            <button onClick={() => subscribe('private-test-matching')}>Subscribe</button>
          )}
          <button onClick={disconnect}>Disconnect</button>
        </>
      )}
    </div>
  );
};
