import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  selected: '',
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
    setLoading(state, action: { payload: boolean; type: string }) {
      state.loading = action.payload;
    },
    setSelectedName(state, action: { payload: string; type: string }) {
      state.selected = action.payload;
    },
    loadFemaleNames(state, action) {
      state.female.firstName = action.payload.first_name;
      state.female.lastName = action.payload.last_name;
    },
    loadMaleNames(state, action) {
      state.male.firstName = action.payload.first_name;
      state.male.lastName = action.payload.last_name;
    },
  },
});

export const nameActions = nameSlice.actions;

export default nameSlice.reducer;
