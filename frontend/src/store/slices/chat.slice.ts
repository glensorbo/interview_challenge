import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  room: 'common',
  messages: [] as {
    _id: string;
    room: string;
    name: string;
    message: string;
    avatar: string;
    time: string;
    createdAt: string;
    updatedAt: string;
  }[],
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
    addChat(state, action) {
      const updatedMessages = [...state.messages];
      updatedMessages.push(action.payload);
      state.messages = updatedMessages;
    },
  },
});

export const chatActions = chatSlice.actions;

export default chatSlice.reducer;
