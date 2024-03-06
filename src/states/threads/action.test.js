import { describe, beforeEach, afterEach, it, expect, vi } from 'vitest';
import toast from 'react-hot-toast';

import api from '../../utils/api';
import { asyncReceiveThreads, receiveThreadsActionCreator } from './action';

/**
 * skenario test
 *
 * - asyncReceiveThreads thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

const fakeThreadsResponse = [
  {
    id: 'thread-1',
    title: 'Thread test pertama',
    body: 'Hello world, ini adalah sebuah body test dari thread',
    category: 'test',
    createdAt: '2023-05-29T07:55:52.266Z',
    ownerId: 'user-1',
    totalComments: 0,
    upVotesBy: [],
    downVotesBy: [],
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncReceiveThreads thunk', () => {
  beforeEach(() => {
    api._getAllThreads = api.getAllThreads;
  });

  afterEach(() => {
    api.getAllThreads = api._getAllThreads;

    // Delete backup data
    delete api._getAllThreads;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    //Arrange
    //Stub implementation
    api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);

    // Mock dispatch
    const dispatch = vi.fn();

    //Action
    await asyncReceiveThreads()(dispatch);

    //Assert
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadsResponse));
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    //  Arrange
    // Stub Implementation
    api.getAllThreads = () => Promise.reject(fakeErrorResponse);

    // Mock dispatch
    const dispatch = vi.fn();
    toast.error = vi.fn();

    // Action
    await asyncReceiveThreads()(dispatch);

    // Assert
    expect(toast.error).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
