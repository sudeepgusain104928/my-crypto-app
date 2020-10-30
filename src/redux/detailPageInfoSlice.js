import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
var config = require("../configFiles/config.js");

export const fetchCryptoInfo = createAsyncThunk(
  "fetchCryptoInfo",
  async (values, thunkAPI) => {
    let url = config.api;

    let api = `${url}/coin/${values.id}?base=${values.base}`;

    try {
      const resp = await fetch(api);
      let jsonData = await resp.json();
      console.log(jsonData);
      return jsonData;
    } catch (err) {
      return err;
    }
  }
);

const getCryptoInfo = createSlice({
  name: "getCryptoInfo",
  initialState: { data: null, isLoading: false, error: null },
  reducers: {},
  extraReducers: {
    [fetchCryptoInfo.fulfilled]: (state, action) => {
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
    [fetchCryptoInfo.pending]: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    [fetchCryptoInfo.rejected]: (state, action) => {
      return {
        data : null,
        isLoading: false,
        error: "An unexpected error occured. Please refresh the page!",
      };
    },
  },
});

export default getCryptoInfo;
