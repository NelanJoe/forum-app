import toast from 'react-hot-toast';

import api from '../../utils/api';
import { THREAD_DETAIL_ACTION_TYPES } from './type';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const receiveThreadDetailActionCreator = (threadDetail) => {
  return {
    type: THREAD_DETAIL_ACTION_TYPES.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
};

const clearThreadDetailActionCreator = () => {
  return {
    type: THREAD_DETAIL_ACTION_TYPES.CLEAR_THREAD_DETAIL,
  };
};

const toggleUpVoteThreadActionCreator = ({ threadId, userId }) => {
  return {
    type: THREAD_DETAIL_ACTION_TYPES.TOGGLE_UPVOTE_THREAD_DETAIL,
    payload: {
      threadId,
      userId,
    },
  };
};

const toggleNeutralVoteThreadActionCreator = ({ threadId, userId }) => {
  return {
    type: THREAD_DETAIL_ACTION_TYPES.TOGGLE_NEUTRALVOTE_THREAD_DETAIL,
    payload: {
      threadId,
      userId,
    },
  };
};

const toggleDownThreadActionCreator = ({ threadId, userId }) => {
  return {
    type: THREAD_DETAIL_ACTION_TYPES.TOGGLE_DOWNVOTE_THREAD_DETAIL,
    payload: {
      threadId,
      userId,
    },
  };
};

// Comment Feature
const addThreadCommentActionCreator = ({ threadId, comment }) => {
  return {
    type: THREAD_DETAIL_ACTION_TYPES.ADD_COMMENT_THREAD_DETAIL,
    payload: {
      threadId,
      comment,
    },
  };
};

const toggleUpVoteCommentActionCreator = ({ commentId, userId }) => {
  return {
    type: THREAD_DETAIL_ACTION_TYPES.TOGGLE_UPVOTE_COMMENT_THREAD_DETAIL,
    payload: {
      commentId,
      userId,
    },
  };
};

const toggleNeutralVoteCommentActionCreator = ({ commentId, userId }) => {
  return {
    type: THREAD_DETAIL_ACTION_TYPES.TOGGLE_NEUTRALVOTE_COMMENT_THREAD_DETAIL,
    payload: {
      commentId,
      userId,
    },
  };
};

const toggleDownVoteCommentActionCreator = ({ commentId, userId }) => {
  return {
    type: THREAD_DETAIL_ACTION_TYPES.TOGGLE_DOWNVOTE_COMMENT_THREAD_DETAIL,
    payload: {
      commentId,
      userId,
    },
  };
};

const asyncReceiveThreadDetail = (threadId) => {
  return async (dispatch) => {
    dispatch(clearThreadDetailActionCreator);

    dispatch(showLoading());

    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      toast.error(error.message);
    }

    dispatch(hideLoading());
  };
};

const asyncToggleUpVoteThreadDetail = (threadId) => {
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

const asyncToggleNeutralVoteThreadDetail = (threadId) => {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleNeutralVoteThreadActionCreator({ threadId, userId: authUser.id }));
    try {
      await api.toggleNeutralVoteThread(threadId);
    } catch (error) {
      dispatch(toggleNeutralVoteThreadActionCreator({ threadId, userId: authUser.id }));
      toast.error(error.message);
    }
  };
};

const asyncToggleDownVoteThreadDetail = (threadId) => {
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

// Comments Feature
const asyncCreateComment = (threadId, content) => {
  return async (dispatch) => {
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addThreadCommentActionCreator({ threadId, comment }));
    } catch (error) {
      toast.error(error.message);
    }
  };
};

const asyncToggleUpVoteCommentThreadDetail = (commentId) => {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      const threadId = threadDetail.id;
      await api.toggleUpVoteCommentThreadDetail({ threadId, commentId });
    } catch (error) {
      dispatch(toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));
      toast.error(error.message);
    }
  };
};

const asyncToggleNeutralVoteCommentThreadDetail = (commentId) => {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleNeutralVoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      const threadId = threadDetail.id;
      await api.toggleNeutralVoteCommentThreadDetail({ threadId, commentId });
    } catch (error) {
      dispatch(toggleNeutralVoteCommentActionCreator({ commentId, userId: authUser.id }));
      toast.error(error.message);
    }
  };
};

const asyncToggleDownVoteCommentThreadDetail = (commentId) => {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      const threadId = threadDetail.id;
      await api.toggleDownVoteCommentThreadDetail({ threadId, commentId });
    } catch (error) {
      dispatch(toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));
      toast.error(error.message);
    }
  };
};

export {
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  addThreadCommentActionCreator,
  asyncReceiveThreadDetail,
  asyncToggleUpVoteThreadDetail,
  asyncToggleNeutralVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncCreateComment,
  asyncToggleUpVoteCommentThreadDetail,
  asyncToggleNeutralVoteCommentThreadDetail,
  asyncToggleDownVoteCommentThreadDetail,
};
