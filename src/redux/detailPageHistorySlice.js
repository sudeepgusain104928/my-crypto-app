import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
var config = require("../configFiles/config.js");

export const fetchCryptoHistory = createAsyncThunk(
  "fetchCryptoHistory",
  async (values, thunkAPI) => {
    let url = config.api;

    let api = `${url}/coin/${values.id}/history/${values.timeFrame}?base=${values.base}`;

    try {
      const resp = await fetch(api);
      let jsonData = await resp.json();
      return jsonData;
    } catch (err) {
      return err;
    }
  }
);

const getCryptoHistory = createSlice({
  name: "getCryptoDetails",
  initialState: { data: null, isLoading: false, error: null },
  reducers: {},
  extraReducers: {
    [fetchCryptoHistory.fulfilled]: (state, action) => {
      if (
        action.payload.status === "error" ||
        action.payload.status === "fail"
      ) {
        return {
          ...state,
          isLoading: false,
          error: action.payload.message,
        };
      } else {
        return {
          ...state,
          data: action.payload.data,
          isLoading: false,
          error: null,
        };
      }
    },
    [fetchCryptoHistory.pending]: (state, action) => {
      return {
        ...state,
        isLoading: true,
       
      };
    },

    [fetchCryptoHistory.rejected]: (state, action) => {
      return {
        data : null,
        isLoading: false,
        error: "An unexpected error occured. Please refresh the page!",
      };
    },
  },
});

export default getCryptoHistory;
