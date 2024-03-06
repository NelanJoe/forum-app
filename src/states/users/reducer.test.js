import { describe, it, expect } from 'vitest';
import usersReducer from './reducer';

/**
 * test scenario for usersReducer
 *
 * - usersReducer function
 *  - should return the initial state when given by unknow action
 */

describe('usersReducer', () => {
  it('should return the initial state when given by unknow action', () => {
    // Arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // Action
    const nextState = usersReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });
});
