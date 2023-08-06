import { StateCreator } from 'zustand';

export type ZustandSet<T> = Parameters<StateCreator<T, [], []>>[0];

export type ZustandGet<T> = Parameters<StateCreator<T, [], []>>[1];

export type ZustandStore<T> = Parameters<StateCreator<T, [], []>>[2];
