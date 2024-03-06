import toast from 'react-hot-toast';
import api from '../../utils/api';
import { THREADS_ACTION_TYPES } from './type';

const receiveThreadsActionCreator = (threads) => {
  return {
    type: THREADS_ACTION_TYPES.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
};

const addThreadActionCreator = (thread) => {
  return {
    type: THREADS_ACTION_TYPES.ADD_THREAD,
    payload: {
      thread,
    },
  };
};

const toggleUpVoteThreadActionCreator = ({ threadId, userId }) => {
  return {
    type: THREADS_ACTION_TYPES.TOGGLE_UPVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
};

const toggleNeutralThreadActionCreator = ({ threadId, userId }) => {
  return {
    type: THREADS_ACTION_TYPES.TOGGLE_NEUTRALVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
};

const toggleDownThreadActionCreator = ({ threadId, userId }) => {
  return {
    type: THREADS_ACTION_TYPES.TOGGLE_DOWNVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
};

const asyncReceiveThreads = () => {
  return async (dispatch) => {
    try {
      const threads = await api.getAllThreads();
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      toast.error(error.message);
    }
  };
};

const asyncAddThread = ({ title, category, body }) => {
  return async (dispatch) => {
    try {
      const thread = await api.createThread(title, category, body);
      dispatch(addThreadActionCreator(thread));

      toast.success('Successfully add new thread');
    } catch (error) {
      toast.error(error.message);
    }
  };
};

const asyncToggleUpVoteThread = (threadId) => {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));
    try {
      await api.toggleUpVoteThread(threadId);
    } catch (error) {
      dispatch(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));
      toast.error(error.message);
    }
  };
};

const asyncToggleNeutralVoteThread = (threadId) => {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleNeutralThreadActionCreator({ threadId, userId: authUser.id }));
    try {
      await api.toggleNeutralVoteThread(threadId);
    } catch (error) {
      dispatch(toggleNeutralThreadActionCreator({ threadId, userId: authUser.id }));
      toast.error(error.message);
    }
  };
};

const asyncToggleDownVoteThread = (threadId) => {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleDownThreadActionCreator({ threadId, userId: authUser.id }));
    try {
      await api.toggleDownVoteThread(threadId);
    } catch (error) {
      dispatch(toggleDownThreadActionCreator({ threadId, userId: authUser.id }));
      toast.error(error.message);
    }
  };
};

export {
  receiveThreadsActionCreator,
  addThreadActionCreator,
  asyncReceiveThreads,
  asyncAddThread,
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
  asyncToggleNeutralVoteThread,
};
