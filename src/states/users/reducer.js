import { USERS_ACTION_TYPES } from './type';

const usersReducer = (users = [], action = {}) => {
  switch (action.type) {
    case USERS_ACTION_TYPES.RECEIVE_USERS:
      return action.payload.users;
    default:
      return users;
  }
};

export default usersReducer;
