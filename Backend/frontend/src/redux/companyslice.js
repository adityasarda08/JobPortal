import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    company: {},
    companies: [], // <-- lowercase
  },
  reducers: {
    setCompany: (state, action) => {
      state.company = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload; 
    },
  },
});

export const { setCompany, setCompanies } = companySlice.actions;

export default companySlice.reducer;