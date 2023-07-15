import { ConnectionState } from '../../types/ConnectionState';
import { connectionErrorHandler } from './error';
import { connectionStateChangeHandler } from './stateChange';
import PusherJs from 'pusher-js';
import { Dispatch, SetStateAction } from 'react';

interface Option {
  setState: Dispatch<SetStateAction<ConnectionState>>;
}

export const setupConnection = (pusher: PusherJs, { setState }: Option) => {
  const handlers = [
    {
      event: 'state_change',
      handler: connectionStateChangeHandler(setState),
    },
    {
      event: 'error',
      handler: connectionErrorHandler(),
    },
  ];

  handlers.forEach(({ event, handler }) => {
    pusher.connection.bind(event, handler);
  });
};
