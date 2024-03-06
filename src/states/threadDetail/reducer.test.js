import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';
import { THREAD_DETAIL_ACTION_TYPES } from './type';

describe('threadDetailReducer', () => {
  it('should return the initial state when given by unknow action', () => {
    // Arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it(`should return thread when given by ${THREAD_DETAIL_ACTION_TYPES.RECEIVE_THREAD_DETAIL} action`, () => {
    // Arrange
    const initialState = [];
    const action = {
      type: THREAD_DETAIL_ACTION_TYPES.RECEIVE_THREAD_DETAIL,
      payload: {
        threadDetail: [
          {
            id: 'thread-1',
            title: 'Thread test pertama',
            body: 'Hello world ini adalah thread test pertama',
            createdAt: '2024-03-03T02:14:19.068Z',
            owner: {
              id: 'user-1',
              name: 'test user',
              avatar: 'https://ui-avatars.com/api/?name=budi&background=random',
            },
            category: 'bug',
            comments: [
              {
                id: 'comment-1',
                content: 'comment pertama',
                createdAt: '2024-03-03T02:22:27.078Z',
                owner: {
                  id: 'user-1',
                  name: 'test user',
                  avatar: 'https://ui-avatars.com/api/?name=budi&background=random',
                },
                upVotesBy: ['user-2'],
                downVotesBy: [],
              },
            ],
            upVotesBy: [],
            downVotesBy: ['user-2'],
          },
          {
            id: 'thread-1',
            title: 'Thread test kedua',
            body: 'Hello world ini adalah thread test kedua',
            createdAt: '2024-03-03T02:14:19.068Z',
            owner: {
              id: 'user-1',
              name: 'test user',
              avatar: 'https://ui-avatars.com/api/?name=budi&background=random',
            },
            category: 'bug',
            comments: [
              {
                id: 'comment-1',
                content: 'comment kedua',
                createdAt: '2024-03-03T02:22:27.078Z',
                owner: {
                  id: 'user-1',
                  name: 'test user',
                  avatar: 'https://ui-avatars.com/api/?name=budi&background=random',
                },
                upVotesBy: ['user-2'],
                downVotesBy: [],
              },
            ],
            upVotesBy: [],
            downVotesBy: ['user-2'],
          },
        ],
      },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it(`should return thread detail with new comment when given by ${THREAD_DETAIL_ACTION_TYPES.ADD_COMMENT_THREAD_DETAIL}`, () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread test pertama',
      body: 'Hello world ini adalah thread test pertama',
      createdAt: '2024-03-03T02:14:19.068Z',
      owner: {
        id: 'user-1',
        name: 'test user',
        avatar: 'https://ui-avatars.com/api/?name=budi&background=random',
      },
      category: 'bug',
      comments: [],
      upVotesBy: [],
      downVotesBy: ['user-2'],
    };

    const action = {
      type: THREAD_DETAIL_ACTION_TYPES.ADD_COMMENT_THREAD_DETAIL,
      payload: {
        threadId: 'thread-1',
        comment: {
          id: 'comment-1',
          content: 'comment pertama',
          createdAt: '2024-03-03T02:22:27.078Z',
          owner: {
            id: 'user-1',
            name: 'test user',
            avatar: 'https://ui-avatars.com/api/?name=budi&background=random',
          },
          upVotesBy: ['user-2'],
          downVotesBy: [],
        },
      },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [action.payload.comment, ...initialState.comments],
    });
  });

  it(`should return the thread detail with toggled up vote thread detail when given ${THREAD_DETAIL_ACTION_TYPES.TOGGLE_UPVOTE_THREAD_DETAIL} action`, () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread test pertama',
      body: 'Hello world ini adalah thread test pertama',
      createdAt: '2024-03-03T02:14:19.068Z',
      owner: {
        id: 'user-1',
        name: 'test user',
        avatar: 'https://ui-avatars.com/api/?name=budi&background=random',
      },
      category: 'bug',
      comments: [
        {
          id: 'comment-1',
          content: 'comment pertama',
          createdAt: '2024-03-03T02:22:27.078Z',
          owner: {
            id: 'user-1',
            name: 'test user',
            avatar: 'https://ui-avatars.com/api/?name=budi&background=random',
          },
          upVotesBy: ['user-2'],
          downVotesBy: [],
        },
      ],
      upVotesBy: [],
      downVotesBy: [],
    };

    const action = {
      type: THREAD_DETAIL_ACTION_TYPES.TOGGLE_UPVOTE_THREAD_DETAIL,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [action.payload.userId],
      downVotesBy: [],
    });
  });

  it(`should return the thread detail with toggled neutral vote thread detail when given ${THREAD_DETAIL_ACTION_TYPES.TOGGLE_NEUTRALVOTE_THREAD_DETAIL} action`, () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread test pertama',
      body: 'Hello world ini adalah thread test pertama',
      createdAt: '2024-03-03T02:14:19.068Z',
      owner: {
        id: 'user-1',
        name: 'test user',
        avatar: 'https://ui-avatars.com/api/?name=budi&background=random',
      },
      category: 'bug',
      comments: [
        {
          id: 'comment-1',
          content: 'comment pertama',
          createdAt: '2024-03-03T02:22:27.078Z',
          owner: {
            id: 'user-1',
            name: 'test user',
            avatar: 'https://ui-avatars.com/api/?name=budi&background=random',
          },
          upVotesBy: ['user-2'],
          downVotesBy: [],
        },
      ],
      upVotesBy: [],
      downVotesBy: [],
    };

    const action = {
      type: THREAD_DETAIL_ACTION_TYPES.TOGGLE_NEUTRALVOTE_THREAD_DETAIL,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [],
      downVotesBy: [],
    });
  });

  it(`should return the thread detail with toggled down vote thread detail when given ${THREAD_DETAIL_ACTION_TYPES.TOGGLE_DOWNVOTE_THREAD_DETAIL} action`, () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread test pertama',
      body: 'Hello world ini adalah thread test pertama',
      createdAt: '2024-03-03T02:14:19.068Z',
      owner: {
        id: 'user-1',
        name: 'test user',
        avatar: 'https://ui-avatars.com/api/?name=budi&background=random',
      },
      category: 'bug',
      comments: [
        {
          id: 'comment-1',
          content: 'comment pertama',
          createdAt: '2024-03-03T02:22:27.078Z',
          owner: {
            id: 'user-1',
            name: 'test user',
            avatar: 'https://ui-avatars.com/api/?name=budi&background=random',
          },
          upVotesBy: ['user-2'],
          downVotesBy: [],
        },
      ],
      upVotesBy: [],
      downVotesBy: [],
    };

    const action = {
      type: THREAD_DETAIL_ACTION_TYPES.TOGGLE_DOWNVOTE_THREAD_DETAIL,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [],
      downVotesBy: [action.payload.userId],
    });
  });

  it(`should return the thread detail with toggled up vote comment thread detail when given ${THREAD_DETAIL_ACTION_TYPES.TOGGLE_UPVOTE_COMMENT_THREAD_DETAIL} action`, () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread test pertama',
      body: 'Hello world ini adalah thread test pertama',
      createdAt: '2024-03-03T02:14:19.068Z',
      owner: {
        id: 'user-1',
        name: 'test user',
        avatar: 'https://ui-avatars.com/api/?name=budi&background=random',
      },
      category: 'bug',
      comments: [
        {
          id: 'comment-1',
          content: 'comment pertama',
          createdAt: '2024-03-03T02:22:27.078Z',
          owner: {
            id: 'user-1',
            name: 'test user',
            avatar: 'https://ui-avatars.com/api/?name=budi&background=random',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
      upVotesBy: [],
      downVotesBy: [],
    };

    const action = {
      type: THREAD_DETAIL_ACTION_TYPES.TOGGLE_UPVOTE_COMMENT_THREAD_DETAIL,
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [action.payload.userId],
          downVotesBy: [],
        },
      ],
    });
  });

  it(`should return the thread detail with toggled neutral vote comment thread detail when given ${THREAD_DETAIL_ACTION_TYPES.TOGGLE_NEUTRALVOTE_COMMENT_THREAD_DETAIL} action`, () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread test pertama',
      body: 'Hello world ini adalah thread test pertama',
      createdAt: '2024-03-03T02:14:19.068Z',
      owner: {
        id: 'user-1',
        name: 'test user',
        avatar: 'https://ui-avatars.com/api/?name=budi&background=random',
      },
      category: 'bug',
      comments: [
        {
          id: 'comment-1',
          content: 'comment pertama',
          createdAt: '2024-03-03T02:22:27.078Z',
          owner: {
            id: 'user-1',
            name: 'test user',
            avatar: 'https://ui-avatars.com/api/?name=budi&background=random',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
      upVotesBy: [],
      downVotesBy: [],
    };

    const action = {
      type: THREAD_DETAIL_ACTION_TYPES.TOGGLE_NEUTRALVOTE_COMMENT_THREAD_DETAIL,
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    });
  });

  it(`should return the thread detail with toggled down vote comment thread detail when given ${THREAD_DETAIL_ACTION_TYPES.TOGGLE_NEUTRALVOTE_COMMENT_THREAD_DETAIL} action`, () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread test pertama',
      body: 'Hello world ini adalah thread test pertama',
      createdAt: '2024-03-03T02:14:19.068Z',
      owner: {
        id: 'user-1',
        name: 'test user',
        avatar: 'https://ui-avatars.com/api/?name=budi&background=random',
      },
      category: 'bug',
      comments: [
        {
          id: 'comment-1',
          content: 'comment pertama',
          createdAt: '2024-03-03T02:22:27.078Z',
          owner: {
            id: 'user-1',
            name: 'test user',
            avatar: 'https://ui-avatars.com/api/?name=budi&background=random',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
      upVotesBy: [],
      downVotesBy: [],
    };

    const action = {
      type: THREAD_DETAIL_ACTION_TYPES.TOGGLE_DOWNVOTE_COMMENT_THREAD_DETAIL,
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [],
          downVotesBy: [action.payload.userId],
        },
      ],
    });
  });
});
