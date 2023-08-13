import { tacticalStack, unitStack } from '@/features/games/battleLine/constants';
import { BattleLineStore, useBattleLineStore } from '@/features/games/battleLine/store';
import { TacticalCard, TacticalType } from '@/features/games/battleLine/types';
import { act, renderHook } from '@testing-library/react';

describe('battleLine/store', () => {
  let result: { current: BattleLineStore };

  beforeEach(() => {
    result = renderHook(() => useBattleLineStore()).result;
  });

  const selectAndPlayCard = (handIndex: number, battlefieldIndex?: number) => {
    act(() => result.current.selectHand(handIndex));
    act(() => result.current.playCard(battlefieldIndex));
  };

  describe('setup', () => {
    it('ストアの初期化', () => {
      act(() => result.current.setup('opponent'));
      expect(result.current.unitStack.length).toBe(unitStack.length - 14);
      expect(result.current.tacticalStack.length).toBe(tacticalStack.length);
      expect(result.current.myHands.length).toBe(7);
      expect(result.current.opponentHands.length).toBe(7);
      expect(result.current.turn).toEqual({ type: 'playCard', player: 'opponent' });
    });

    it('turn = initじゃないとエラー', () => {
      act(() => result.current.setup('myself'));
      expect(() => act(() => result.current.setup('myself'))).toThrowError();
    });
  });

  describe('基本操作', () => {
    beforeEach(() => {
      act(() => result.current.setup('myself'));
    });

    describe('自分の手札を選択', () => {
      it('通常の操作', () => {
        act(() => result.current.selectHand(0));
        expect(result.current.selectedIndex).toBe(0);
      });

      it('存在しないカードを選択するとエラー', () => {
        [-1, 7].forEach((i) => {
          expect(() => act(() => result.current.selectHand(i))).toThrowError();
        });
      });
    });

    describe('自分の手札を場に出す', () => {
      describe('ユニットカード', () => {
        it('カードを場に出す', () => {
          const card = { ...result.current.myHands[0] };
          selectAndPlayCard(0, 0);
          expect(result.current.battlefields[0].myFormation.length).toBe(1);
          expect(result.current.battlefields[0].myFormation[0]).toEqual(card);
          expect(result.current.myHands.length).toBe(6);
          expect(result.current.myHands).not.toContainEqual(card);
          expect(result.current.turn).toEqual({ type: 'drawCard', player: 'myself' });
        });

        it('フィールドが埋まっているとエラー', () => {
          result.current.battlefields[0].myFormation = result.current.unitStack.slice(0, 3);
          act(() => result.current.selectHand(0));
          expect(() => act(() => result.current.playCard(0))).toThrowError();
          expect(result.current.myHands.length).toBe(7);
        });

        it('フィールドを選択していないとエラー', () => {
          expect(() => selectAndPlayCard(0)).toThrowError();
        });
      });

      describe('士気高揚戦術カード', () => {
        const tacticalCards = [
          {
            type: 'TACTICAL',
            id: TacticalType.ALEXANDER,
            tacticalType: TacticalType.ALEXANDER,
          },
          {
            type: 'TACTICAL',
            id: TacticalType.DARIUS,
            tacticalType: TacticalType.DARIUS,
          },
          {
            type: 'TACTICAL',
            id: TacticalType.COMPANION_CAVALRY,
            tacticalType: TacticalType.COMPANION_CAVALRY,
          },
          {
            type: 'TACTICAL',
            id: TacticalType.SHIELD_BEARERS,
            tacticalType: TacticalType.SHIELD_BEARERS,
          },
        ] as const;

        beforeEach(() => {
          result.current.myHands = [...tacticalCards, ...result.current.myHands.slice(4, 7)];
        });

        it('カードを場に出す', () => {
          tacticalCards.forEach((card, i) => {
            result.current.turn = { type: 'playCard', player: 'myself' };
            selectAndPlayCard(0, i);
            expect(result.current.battlefields[i].myFormation).toContainEqual(card);
            expect(result.current.myHands).not.toContainEqual(card);
          });
        });
      });

      describe('気象戦術カード', () => {
        const tacticalCards = [
          {
            type: 'TACTICAL',
            id: TacticalType.FOG,
            tacticalType: TacticalType.FOG,
          },
          {
            type: 'TACTICAL',
            id: TacticalType.MUD,
            tacticalType: TacticalType.MUD,
          },
        ] as const;

        beforeEach(() => {
          result.current.myHands = [...tacticalCards, ...result.current.myHands.slice(2, 7)];
        });

        it('カードを場に出す', () => {
          tacticalCards.forEach((card, i) => {
            result.current.turn = { type: 'playCard', player: 'myself' };
            selectAndPlayCard(0, i);
            expect(result.current.battlefields[i].field).toContainEqual(card);
            expect(result.current.myHands).not.toContainEqual(card);
          });
        });
      });

      describe('謀略戦術カード', () => {
        const playAndVerifyConspiracyCard = (tacticalCard: TacticalCard) => {
          selectAndPlayCard(0);
          expect(result.current.myTrash).toContainEqual(tacticalCard);
          expect(result.current.myHands).not.toContainEqual(tacticalCard);
          expect(result.current.turn).toEqual({
            type: 'processing',
            player: 'myself',
            tacticalType: tacticalCard.tacticalType,
          });
        };

        describe('偵察', () => {
          const ScoutCard = {
            type: 'TACTICAL',
            id: TacticalType.SCOUT,
            tacticalType: TacticalType.SCOUT,
          } as const;

          it('カードをプレイ', () => {
            result.current.myHands = [ScoutCard, ...result.current.myHands.slice(1, 7)];
            playAndVerifyConspiracyCard(ScoutCard);
          });
        });

        describe('配置転換', () => {
          const RedeployCard = {
            type: 'TACTICAL',
            id: TacticalType.REDEPLOY,
            tacticalType: TacticalType.REDEPLOY,
          } as const;

          it('カードを場に出す', () => {
            result.current.myHands = [RedeployCard, ...result.current.myHands.slice(1, 7)];
            playAndVerifyConspiracyCard(RedeployCard);
          });
        });

        describe('脱走', () => {
          const DeserterCard = {
            type: 'TACTICAL',
            id: TacticalType.DESERTER,
            tacticalType: TacticalType.DESERTER,
          } as const;

          it('カードを場に出す', () => {
            result.current.myHands = [DeserterCard, ...result.current.myHands.slice(1, 7)];
            playAndVerifyConspiracyCard(DeserterCard);
          });
        });

        describe('裏切り', () => {
          const TraitorCard = {
            type: 'TACTICAL',
            id: TacticalType.TRAITOR,
            tacticalType: TacticalType.TRAITOR,
          } as const;

          it('カードを場に出す', () => {
            result.current.myHands = [TraitorCard, ...result.current.myHands.slice(1, 7)];
            playAndVerifyConspiracyCard(TraitorCard);
          });
        });
      });

      it('カードを選択していないとエラー', () => {
        const battlefieldIndex = Math.floor(Math.random() * 9);
        expect(() => act(() => result.current.playCard(battlefieldIndex))).toThrowError();
      });

      it('存在しないフィールドに出すとエラー', () => {
        [-1, 9].forEach((i) => {
          expect(() => selectAndPlayCard(0, i)).toThrowError();
        });
      });

      it('自分のターンじゃないとカードを場に出せない', () => {
        result.current.turn = { type: 'playCard', player: 'opponent' };
        console.log(result.current.turn);
        expect(() => selectAndPlayCard(0, 0)).toThrowError();
      });
    });

    describe('手札を補充する', () => {
      it('ユニットカードを補充する', () => {
        const card = result.current.unitStack[0];
        const stackNumber = result.current.unitStack.length;
        selectAndPlayCard(0, 0);
        act(() => result.current.drawCard('UNIT'));
        expect(result.current.myHands.length).toBe(7);
        expect(result.current.myHands).toContainEqual(card);
        expect(result.current.unitStack.length).toBe(stackNumber - 1);
        expect(result.current.turn).toEqual({ type: 'decision', player: 'myself' });
      });

      it('タクティカルカードを補充する', () => {
        const card = result.current.tacticalStack[0];
        const stackNumber = result.current.tacticalStack.length;
        selectAndPlayCard(0, 0);
        act(() => result.current.drawCard('TACTICAL'));
        expect(result.current.myHands.length).toBe(7);
        expect(result.current.myHands).toContainEqual(card);
        expect(result.current.tacticalStack.length).toBe(stackNumber - 1);
        expect(result.current.turn).toEqual({ type: 'decision', player: 'myself' });
      });

      it('カードを出してない時はエラー', () => {
        expect(() => act(() => result.current.drawCard('UNIT'))).toThrowError();
      });

      it('山札がない時はエラー', () => {
        result.current.unitStack = [];
        result.current.tacticalStack = [];
        (['UNIT', 'TACTICAL'] as const).forEach((type) => {
          result.current.turn = { type: 'playCard', player: 'myself' };
          selectAndPlayCard(0, 0);
          expect(() => act(() => result.current.drawCard(type))).toThrowError();
        });
      });
    });
  });
});
