import { describe, it, expect } from 'vitest';

import { AUTH_USER_ACTION_TYPES } from './type';

import authUserReducer from './reducer';

describe('authUserReducer', () => {
  it('should return the initial state when given by unknow action', () => {
    // Arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // Action
    const nextState = authUserReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it(`should return the authUser when given by ${AUTH_USER_ACTION_TYPES.SET_AUTH_USER} action`, () => {
    // Arrange
    const initialState = null;

    const action = {
      type: AUTH_USER_ACTION_TYPES.SET_AUTH_USER,
      payload: {
        authUser: {
          id: 'user-aROWej8yYA1sOfHN',
          name: 'Dicoding',
          email: 'admin@dicoding.com',
          avatar: 'https://ui-avatars.com/api/?name=Dicoding&background=random',
        },
      },
    };

    // Action
    const nextState = authUserReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(action.payload.authUser);
  });

  it(`should return the authUser with value null when given by ${AUTH_USER_ACTION_TYPES.UNSET_AUTH_USER} action`, () => {
    // Arrange
    const initialState = null;

    const action = {
      type: AUTH_USER_ACTION_TYPES.UNSET_AUTH_USER,
    };

    // Action
    const nextState = authUserReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(null);
  });
});
