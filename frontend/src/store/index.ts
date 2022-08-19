import { configureStore } from '@reduxjs/toolkit';

import nameSlice from './slices/name.slice';
import chatSlice from './slices/chat.slice';
import userSlice from './slices/user.slice';

export const store = configureStore({
  reducer: {
    names: nameSlice,
    chat: chatSlice,
    users: userSlice,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
