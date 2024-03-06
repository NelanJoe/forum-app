import { describe, it, expect } from 'vitest';
import leaderboardsReducer from './reducer';
import { LEADERBOARDS_ACTION_TYPES } from './type';

/**
 * test scenario for leaderboardsReducer
 *
 * - leaderboardsReducer function
 *  - should return the initial state when given by unknow action
 *  - should return the leaderboards when given by leaderboards/RECEIVE_LEADERBOARDS action
 */

describe('leaderboardsReducer', () => {
  it('should return the initial state when given by unknow action', () => {
    // Arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // Action
    const nextState = leaderboardsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it(`should return the leaderboards when given by ${LEADERBOARDS_ACTION_TYPES.RECEIVE_LEADERBOARDS} action`, () => {
    // Arrange
    const initialState = [];

    const action = {
      type: LEADERBOARDS_ACTION_TYPES.RECEIVE_LEADERBOARDS,
      payload: {
        leaderboards: [
          {
            user: {
              id: 'user-mQhLzINW_w5TxxYf',
              name: 'Dimas Saputra',
              email: 'dimas@dicoding.com',
              avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
            },
            score: 25,
          },
          {
            user: {
              id: 'user-aROWej8yYA1sOfHN',
              name: 'Dicoding',
              email: 'admin@dicoding.com',
              avatar: 'https://ui-avatars.com/api/?name=Dicoding&background=random',
            },
            score: 0,
          },
          {
            user: {
              id: 'user-qNlzdBwJg6Y5lvMh',
              name: 'lya',
              email: 'lyara@gmail.com',
              avatar: 'https://ui-avatars.com/api/?name=lya&background=random',
            },
            score: 0,
          },
        ],
      },
    };

    // Action
    const nextState = leaderboardsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(action.payload.leaderboards);
  });
});
