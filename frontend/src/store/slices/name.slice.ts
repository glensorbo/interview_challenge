import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  all: {
    firstName: [] as string[],
    lastName: [] as string[],
  },
  female: {
    firstName: [] as string[],
    lastName: [] as string[],
  },
  male: {
    firstName: [] as string[],
    lastName: [] as string[],
  },
};

export const nameSlice = createSlice({
  name: 'names',
  initialState,
  reducers: {
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    loadAllNames(state, action) {
      state.all = action.payload;
    },
    loadFemaleNames(state, action) {
      state.female = action.payload;
    },
    loadMaleNames(state, action) {
      state.male = action.payload;
    },
  },
});

export const nameActions = nameSlice.actions;

export default nameSlice.reducer;
