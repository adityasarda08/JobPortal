import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    alljobs: [],
    alladminjobs: [],
    singleJob: null,
    allappliedjobs: [],
    setSearchQuery: "",
  },
  reducers: {
    setalljobs: (state, action) => {
      state.alljobs = action.payload;
    },
    setalladminjobs: (state, action) => {
      state.alladminjobs = action.payload ?? [];
    },
    setSinglejob: (state, action) => {
      state.singleJob = action.payload;
    },
    setallappliedjobs: (state, action) => {
      state.allappliedjobs = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.setSearchQuery = action.payload;
    },
  },
});

export const { setalljobs, setSinglejob, setalladminjobs, setallappliedjobs, setSearchQuery } =
  jobSlice.actions;

export default jobSlice.reducer;
