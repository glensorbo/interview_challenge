import { createSlice } from '@reduxjs/toolkit';

export type Chatter = {
  _id: string;
  name: string;
  socket_id: string;
  avatar: string;
  status: string;
  joined: string;
};

const initialState = {
  loading: true,
  current: {
    name: '',
    avatar: '',
    socketId: '',
  },
  chatters: [
    {
      _id: '',
      name: '',
      socket_id: '',
      avatar: '',
      status: '',
      joined: '',
    },
  ] as Chatter[],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    loadUsers(state, action: { payload: Chatter[] }) {
      state.chatters = action.payload;
    },
    setCurrentUser(
      state,
      action: { payload: { name: string; avatar: string; socketId: string } }
    ) {
      state.current = action.payload;
    },
    updateUserList(state, action: { payload: Chatter[] }) {
      state.chatters = action.payload;
    },
    removeUser(state, action) {
      state.chatters = state.chatters.filter(
        (user) => user.socket_id !== action.payload
      );
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
