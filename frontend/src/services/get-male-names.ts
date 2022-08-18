import { nameActions } from './../store/slices/name.slice';
import { AppDispatch } from './../store/index';
import API from '../lib/api';

export const getMaleNames = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await API.get('/name/male');
      dispatch(nameActions.loadMaleNames(data));
    } catch (error) {
      console.error(error);
    }
  };
};
