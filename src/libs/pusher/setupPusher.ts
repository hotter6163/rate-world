import { ConnectionState } from './ConnectionState';
import Pusher from 'pusher-js';
import { Dispatch, SetStateAction } from 'react';

interface Argument {
  pusher: Pusher;
  setState: Dispatch<SetStateAction<ConnectionState>>;
  setError: Dispatch<SetStateAction<string>>;
}

export const setupPusher = ({ pusher, setState, setError }: Argument) => {
  pusher.connection.bind('error', (error: any) => {
    // TODO: UIでエラーを表示する
    console.error('connection error', error);
    if (error.error.data.code === 4004) {
      setError('Over limit!');
    }
  });

  pusher.connection.bind(
    'state_change',
    (states: { previous: ConnectionState; current: ConnectionState }) => {
      console.info(`Previous state: ${states.previous}, Current state: ${states.current}`);
      setState(states.current);
    },
  );
};
