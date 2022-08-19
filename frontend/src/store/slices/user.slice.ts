import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  chatters: [] as { _id: string; name: string; socket_id: string }[],
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
    addUser(
      state,
      action: { payload: { _id: string; name: string; socket_id: string } }
    ) {
      const newList = [...state.chatters];
      newList.push(action.payload);
      state.chatters = newList;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
