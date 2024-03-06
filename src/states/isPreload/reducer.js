import { IS_PRELOAD_ACTION_TYPES } from './type';

const isPreloadReducer = (isPreload = true, action = {}) => {
  switch (action.type) {
    case IS_PRELOAD_ACTION_TYPES.SET_IS_PRELOAD:
      return action.payload.isPreload;
    default:
      return isPreload;
  }
};

export default isPreloadReducer;
