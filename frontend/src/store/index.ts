import { configureStore } from '@reduxjs/toolkit';

import nameSlice from './slices/name.slice';

export const store = configureStore({
  reducer: {
    names: nameSlice,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
