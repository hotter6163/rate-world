import { Game } from '@/games/Game';

export type Channel =
  | {
      prefix: 'private';
      game: Game;
    }
  | {
      prefix: 'presence';
      game: Game;
      id: string;
    };

export const getChannelName = (arg: Channel) =>
  `${arg.prefix}-${arg.game}-${arg.prefix === 'private' ? 'matching' : arg.id}`;

export const splitChannelName = (channelName: string): Channel => {
  const [prefix, game, id] = channelName.split('-') as [string, Game, string];
  switch (prefix) {
    case 'private':
      return { prefix, game };
    case 'presence':
      return { prefix, game, id };
    default:
      throw new Error('Unexpected prefix');
  }
};
