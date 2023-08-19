import { BattleLineStore } from '.';
import { CONSPIRACY_CARD_TYPES, Card, TacticalCard, TacticalType } from '../types';
import { isExpectedTurn } from './utils/isExpectedTurn';
import { ZustandSet } from '@/libs/zustand';

export const playCard =
  (set: ZustandSet<BattleLineStore>): BattleLineStore['playCard'] =>
  (index) => {
    return set((state) => {
      if (state.selectedIndex === null) throw new Error('no card selected');
      if (!isExpectedTurn(state.turn, { type: 'playCard', player: 'myself' }))
        throw new Error('turn is not playCard');

      const selectedCard = state.myHands[state.selectedIndex];

      if (
        selectedCard.type === 'TACTICAL' &&
        (CONSPIRACY_CARD_TYPES as readonly TacticalType[]).includes(selectedCard.tacticalType)
      )
        return processConspiracyCard(state, selectedCard, index);
      else return processPutOnField(state, selectedCard, index);
    });
  };

const processPutOnField = (
  state: BattleLineStore,
  selectedCard: Card,
  index?: number,
): Partial<BattleLineStore> => {
  if (index === undefined) throw new Error('index is undefined');
  if (index < 0 || index > 8) throw new Error('index out of range');
  if (state.battlefields[index].myFormation.length >= 3) throw new Error('field is full');

  switch (selectedCard.id) {
    case TacticalType.FOG:
    case TacticalType.MUD:
      return processWeatherCard(state, index);
    default:
      return processDefault(state, index);
  }
};

const processWeatherCard = (state: BattleLineStore, index: number): Partial<BattleLineStore> => {
  const card = { ...state.myHands[state.selectedIndex!] } as TacticalCard;
  const newBattlefields = state.battlefields.map((b, i) =>
    i === index ? { ...b, field: [...b.field, card] } : { ...b },
  );
  const newHands = getNewHands(state);
  return {
    battlefields: newBattlefields,
    myHands: newHands,
    selectedIndex: null,
    turn: { type: 'drawCard', player: 'myself' },
  };
};

const processDefault = (state: BattleLineStore, index: number): Partial<BattleLineStore> => {
  const card = { ...state.myHands[state.selectedIndex!] };
  const newBattlefields = state.battlefields.map((b, i) =>
    i === index ? { ...b, myFormation: [...b.myFormation, card] } : { ...b },
  );
  const newHands = getNewHands(state);
  return {
    battlefields: newBattlefields,
    myHands: newHands,
    selectedIndex: null,
    turn: { type: 'drawCard', player: 'myself' },
  };
};

const processConspiracyCard = (
  state: BattleLineStore,
  selectedCard: TacticalCard,
  index?: number,
): Partial<BattleLineStore> => {
  if (index !== undefined) throw new Error('index is undefined');

  return {
    myTrash: [...state.myTrash, selectedCard],
    myHands: getNewHands(state),
    selectedIndex: null,
    turn: {
      type: 'processing',
      player: 'myself',
      tacticalType: selectedCard.tacticalType as (typeof CONSPIRACY_CARD_TYPES)[number],
    },
  };
};

const getNewHands = (state: BattleLineStore) =>
  state.myHands.filter((_, i) => i !== state.selectedIndex);
