import { nameActions } from './../store/slices/name.slice';
import { AppDispatch } from './../store/index';
import API from '../lib/api';

export const getAllNames = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await API.get('/name');
      dispatch(nameActions.loadAllNames(data));
    } catch (error) {
      console.error(error);
    }
  };
};
