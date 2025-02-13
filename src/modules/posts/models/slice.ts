import { createSlice } from '@reduxjs/toolkit';

type InitialStateType = {
  name: string;
};

const initialState: InitialStateType = {
  name: '',
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
});
