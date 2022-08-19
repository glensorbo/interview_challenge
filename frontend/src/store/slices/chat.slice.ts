import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  room: 'common',
  messages: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    loadChatHistory(state, action) {
      state.messages = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const chatActions = chatSlice.actions;

export default chatSlice.reducer;
