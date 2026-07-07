import { createSlice } from "@reduxjs/toolkit";

const applicationsSlice = createSlice({
  name: "applications",
  initialState: {
    applications: [],
  },
  reducers: {
    setApplications: (state, action) => {
      state.applications = action.payload;
    },
  },
});

export const { setApplications } = applicationsSlice.actions;

export default applicationsSlice.reducer;
