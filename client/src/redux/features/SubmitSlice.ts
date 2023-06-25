import { createSlice } from "@reduxjs/toolkit";

const initialState = { detectSubmitCompletion: false };

export const submitSlice = createSlice({
  name: "submitState",
  initialState,
  reducers: {
    finished: (state) => {
      state.detectSubmitCompletion = !state.detectSubmitCompletion;
    },
  },
});

export const { finished } = submitSlice.actions;
export default submitSlice.reducer;
