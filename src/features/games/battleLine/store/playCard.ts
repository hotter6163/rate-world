import { BattleLineStore } from '.';
import { TacticalCard, TacticalType } from '../types';
import { ZustandSet } from '@/libs/zustand';

export const playCard =
  (set: ZustandSet<BattleLineStore>): BattleLineStore['playCard'] =>
  (index) => {
    if (index === undefined) throw new Error('index is undefined');
    if (index < 0 || index > 8) throw new Error('index out of range');
    return set((state) => {
      if (state.selectedIndex === null) throw new Error('no card selected');
      if (state.battlefields[index].myFormation.length >= 3) throw new Error('field is full');
      if (state.turn.type !== 'playCard' || state.turn.player !== 'myself')
        throw new Error('turn is not playCard');

      switch (state.myHands[state.selectedIndex].id) {
        case TacticalType.FOG:
        case TacticalType.MUD:
          return processWeatherCard(state, index);
        default:
          return processDefault(state, index);
      }
    });
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

const getNewHands = (state: BattleLineStore) =>
  state.myHands.filter((_, i) => i !== state.selectedIndex);
