import { createSlice } from "@reduxjs/toolkit";

const setCurrency = createSlice({
  name: "setCurrency",
  initialState: "USD",
  reducers: {
    changeCurrency: (state, action) => {
      return action.payload;
    },
  },
});

export const { changeCurrency } = setCurrency.actions;

export default setCurrency;
