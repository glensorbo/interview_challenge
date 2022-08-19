import { AppDispatch } from '../store';

import { chatActions } from '../store/slices/chat.slice';

import API from '../lib/api';

export const getChatHistory = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await API.get('/chat');
      dispatch(chatActions.loadChatHistory(data));
      setTimeout(() => {
        dispatch(chatActions.setLoading(false));
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };
};
