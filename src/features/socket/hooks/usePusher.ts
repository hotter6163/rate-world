'use client';

import { PusherContext } from '../const/PusherContext';
import { useContext } from 'react';

export const usePusher = () => useContext(PusherContext);
