import toast from 'react-hot-toast';
import api from '../../utils/api';

import { AUTH_USER_ACTION_TYPES } from './type';

const setAuthUserActionCreator = (authUser) => {
  return {
    type: AUTH_USER_ACTION_TYPES.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
};

const unsetAuthUserActionCreator = () => {
  return {
    type: AUTH_USER_ACTION_TYPES.UNSET_AUTH_USER,
  };
};

const asyncSetAuthUser = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const token = await api.login({ email, password });
      api.putAccessToken(token);

      const authUser = await api.getOwnProfile();

      dispatch(setAuthUserActionCreator(authUser));

      toast.success('Successfully login');
    } catch (error) {
      toast.error(error.message);
    }
  };
};

const asyncUnsetAuthUser = () => {
  return (dispatch) => {
    dispatch(unsetAuthUserActionCreator());
    api.putAccessToken('');
  };
};

export { setAuthUserActionCreator, unsetAuthUserActionCreator, asyncSetAuthUser, asyncUnsetAuthUser };
