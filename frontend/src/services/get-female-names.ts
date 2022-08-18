import { nameActions } from './../store/slices/name.slice';
import { AppDispatch } from './../store/index';
import API from '../lib/api';

export const getFemaleNames = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await API.get('/name/female');
      dispatch(nameActions.loadFemaleNames(data));
    } catch (error) {
      console.error(error);
    }
  };
};
