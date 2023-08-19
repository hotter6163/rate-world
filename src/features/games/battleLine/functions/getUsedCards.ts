import { Battlefield, Card, TacticalCard } from '../types';

export const getUsedCards = (
  battlefields: Battlefield[],
  trash: { mine: TacticalCard[]; opponent: TacticalCard[] },
) =>
  battlefields.reduce(
    (usedCards, battlefield) => [
      ...usedCards,
      ...battlefield.myFormation,
      ...battlefield.opponentFormation,
      ...battlefield.field,
    ],
    [...trash.mine, ...trash.opponent] as Card[],
  );
