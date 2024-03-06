import toast from 'react-hot-toast';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

import api from '../../utils/api';

import { LEADERBOARDS_ACTION_TYPES } from './type';

const receiveLeaderboardsActionCreator = (leaderboards) => {
  return {
    type: LEADERBOARDS_ACTION_TYPES.RECEIVE_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
};

const asyncReceiveLeaderboards = () => {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const leaderboards = await api.getAllLeaderboards();
      dispatch(receiveLeaderboardsActionCreator(leaderboards));
    } catch (error) {
      toast.error(error.message);
    }

    dispatch(hideLoading());
  };
};

export { receiveLeaderboardsActionCreator, asyncReceiveLeaderboards };
