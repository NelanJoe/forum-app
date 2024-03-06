import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';
import { THREADS_ACTION_TYPES } from './type';

describe('threadsReducer', () => {
  it('should return the initial state when given by unknow action', () => {
    // Arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it(`should return threads when given by ${THREADS_ACTION_TYPES.RECEIVE_THREADS} action`, () => {
    // Arrange
    const initialState = [];
    const action = {
      type: THREADS_ACTION_TYPES.RECEIVE_THREADS,
      payload: {
        threads: [
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
          {
            id: 'thread-2',
            title: 'Thread test kedua',
            body: 'Hello world, ini adalah sebuah body test dari thread',
            category: 'test',
            createdAt: '2023-05-29T07:55:52.266Z',
            ownerId: 'user-2',
            totalComments: 1,
            upVotesBy: ['user-mQhLzINW_w5TxxYf'],
            downVotesBy: [],
          },
        ],
      },
    };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it(`should return the threads with the new thread when given by ${THREADS_ACTION_TYPES.ADD_THREAD}`, () => {
    // Arrange
    const initialState = [
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

    const action = {
      type: THREADS_ACTION_TYPES.ADD_THREAD,
      payload: {
        thread: {
          id: 'thread-2',
          title: 'Thread test pertama',
          body: 'Hello world, ini adalah sebuah body test dari thread',
          category: 'test',
          createdAt: '2023-05-29T07:55:52.266Z',
          ownerId: 'user-2',
          totalComments: 0,
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  it(`should return the threads with the toggle up vote thread when given by ${THREADS_ACTION_TYPES.TOGGLE_UPVOTE_THREAD}`, () => {
    // Arrange
    const initialState = [
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

    const action = {
      type: THREADS_ACTION_TYPES.TOGGLE_UPVOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [action.payload.userId],
        downVotesBy: [],
      },
    ]);
  });

  it(`should return the threads with the toggle neutral vote thread when given by ${THREADS_ACTION_TYPES.TOGGLE_NEUTRALVOTE_THREAD}`, () => {
    // Arrange
    const initialState = [
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

    const action = {
      type: THREADS_ACTION_TYPES.TOGGLE_NEUTRALVOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [],
        downVotesBy: [],
      },
    ]);
  });

  it(`should return the threads with the toggle down vote thread when given by ${THREADS_ACTION_TYPES.TOGGLE_DOWNVOTE_THREAD}`, () => {
    // Arrange
    const initialState = [
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

    const action = {
      type: THREADS_ACTION_TYPES.TOGGLE_DOWNVOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [],
        downVotesBy: [action.payload.userId],
      },
    ]);
  });
});
