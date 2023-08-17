import { Card, TacticalCard, UnitCard } from '../../types';

export const splitCards = (cards: Card[]) =>
  cards.reduce(
    ({ unitCards, tacticalCards }, card) => ({
      unitCards: card.type === 'UNIT' ? [...unitCards, card] : [...unitCards],
      tacticalCards: card.type === 'TACTICAL' ? [...tacticalCards, card] : [...tacticalCards],
    }),
    { unitCards: [] as UnitCard[], tacticalCards: [] as TacticalCard[] },
  );
