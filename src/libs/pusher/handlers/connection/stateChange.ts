import { ConnectionState } from '../../types/ConnectionState';
import { Dispatch, SetStateAction } from 'react';

export const connectionStateChangeHandler =
  (setState: Dispatch<SetStateAction<ConnectionState>>) =>
  (states: { previous: ConnectionState; current: ConnectionState }) => {
    console.info(`Previous state: ${states.previous}, Current state: ${states.current}`);
    setState(states.current);
  };
