import { nameActions } from './../store/slices/name.slice';
import { AppDispatch } from './../store/index';
import API from '../lib/api';

export const getAllNames = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await API.get('/name');
      dispatch(nameActions.loadFemaleNames(data.femaleNames));
      dispatch(nameActions.loadMaleNames(data.maleNames));
      setTimeout(() => {
        dispatch(nameActions.setLoading(false));
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };
};
