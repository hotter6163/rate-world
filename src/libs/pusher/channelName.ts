import { Game } from '@prisma/client';

export type Channel =
  | {
      prefix: 'private';
      game: Game;
      id: 'matching';
    }
  | {
      prefix: 'presence';
      game: Game;
      id: string;
    };

export const getChannelName = ({ prefix, game, id }: Channel) => `${prefix}-${game}-${id}`;

export const splitChannelName = (channelName: string): Channel => {
  const [prefix, game, id] = channelName.split('-') as [string, Game, string];
  switch (prefix) {
    case 'private':
      return { prefix, game, id: 'matching' };
    case 'presence':
      return { prefix, game, id };
    default:
      throw new Error('Unexpected prefix');
  }
};
