import { builder } from './builder';
import './fields/matching';
import './fields/pusher';
import './types/giraffe';

export const schema = builder.toSchema();
