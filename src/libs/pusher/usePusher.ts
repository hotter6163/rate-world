import { PusherContext } from './PusherContext';
import { useContext } from 'react';

export const usePusher = () => useContext(PusherContext);
