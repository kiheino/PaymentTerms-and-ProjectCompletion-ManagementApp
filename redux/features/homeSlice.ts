import { createSlice } from "@reduxjs/toolkit";
import { Project } from "../../types/api/Project";
import { Invoice } from "../../types/api/Invoice";

type SliceState = {
  projectList: Project[];
  unClaimedBills: Invoice[];
  detectChange: boolean;
};

const initialState: SliceState = {
  projectList: [],
  unClaimedBills: [],
  detectChange: false,
};

export const homeSlice = createSlice({
  name: "homeManagement",
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projectList = action.payload;
    },
    setunClaimedBills: (state, action) => {
      state.unClaimedBills = action.payload;
    },
    refreshProjects: (state) => {
      state.detectChange = !state.detectChange;
    },
  },
});

export const { setProjects, setunClaimedBills, refreshProjects } =
  homeSlice.actions;
export default homeSlice.reducer;
