import { describe, it, expect } from 'vitest';

import isPreloadReducer from './reducer';
import { IS_PRELOAD_ACTION_TYPES } from './type';

/**
 * test scenario for isPreloadReducer
 *
 * - isPreloadReducer function
 *  - should return the initial state when given by unknow action
 *  - should return the isPreload with value boolen when given by isPreload/SET_IS_PRELOAD action
 */

describe('isPreloadReducer', () => {
  it('should return the initial state when given by unknow action', () => {
    // Arrange
    const initialState = true;
    const action = { type: 'UNKNOWN' };

    // Action
    const nextState = isPreloadReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it(`should return the isPreload with value boolen when given by ${IS_PRELOAD_ACTION_TYPES.SET_IS_PRELOAD}`, () => {
    // Arrange
    const initialState = true;
    const action = {
      type: IS_PRELOAD_ACTION_TYPES.SET_IS_PRELOAD,
      payload: {
        isPreload: false,
      },
    };

    const actionTrue = {
      type: IS_PRELOAD_ACTION_TYPES.SET_IS_PRELOAD,
      payload: {
        isPreload: true,
      },
    };

    // Action
    const nextState = isPreloadReducer(initialState, action);

    const nextState2 = isPreloadReducer(initialState, actionTrue);

    // Assert
    expect(nextState).toEqual(false);
    expect(nextState2).toEqual(true);
  });
});
