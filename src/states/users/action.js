import toast from 'react-hot-toast';
import api from '../../utils/api';
import { USERS_ACTION_TYPES } from './type';

const recieveUsersActionCreator = (users) => {
  return {
    type: USERS_ACTION_TYPES.RECEIVE_USERS,
    payload: {
      users,
    },
  };
};

const asyncRegisterUser = ({ name, email, password }) => {
  return async () => {
    try {
      await api.register({ name, email, password });
      toast.success('Successfully register new user');
    } catch (error) {
      toast.error(error.message);
    }
  };
};

export { recieveUsersActionCreator, asyncRegisterUser };
