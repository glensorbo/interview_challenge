import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  current: {
    name: '',
    avatar: '',
  },
  chatters: [] as {
    _id: string;
    name: string;
    socket_id: string;
    avatar: string;
  }[],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    loadUsers(state, action) {
      state.chatters = action.payload;
    },
    setCurrentUser(state, action: { payload: { name: string; avatar: string } }) {
      state.current = action.payload;
    },
    addUser(
      state,
      action: {
        payload: {
          _id: string;
          name: string;
          socket_id: string;
          avatar: string;
        };
      }
    ) {
      const newList = [...state.chatters];
      newList.push(action.payload);
      state.chatters = newList;
    },
    removeUser(state, action) {
      state.chatters = state.chatters.filter((user) => user.socket_id !== action.payload);
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
