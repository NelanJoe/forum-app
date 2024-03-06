import { LEADERBOARDS_ACTION_TYPES } from './type';

const leaderboardsReducer = (leaderboards = [], action = {}) => {
  switch (action.type) {
    case LEADERBOARDS_ACTION_TYPES.RECEIVE_LEADERBOARDS:
      return action.payload.leaderboards;
    default:
      return leaderboards;
  }
};

export default leaderboardsReducer;
