import { AppDispatch } from '../store';

import { userActions } from './../store/slices/user.slice';

import API from '../lib/api';

export const getUsersInChat = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await API.get('/user');
      dispatch(userActions.loadUsers(data));
    } catch (error) {
      console.error(error);
    }
  };
};
