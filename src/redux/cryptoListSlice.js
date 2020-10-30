import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
var config = require("../configFiles/config.js");

export const fetchCryptoList = createAsyncThunk(
  "fetchCryptoList",
  async (values, thunkAPI) => {
    let url = config.api;

    let api = `${url}/coins?base=${values.base}&limit=9&offset=${values.offset}`;
    try {
      const resp = await fetch(api);
      let jsonData = await resp.json();
      return jsonData;
    } catch (err) {
      return err;
    }
  }
);

const getCryptoList = createSlice({
  name: "getCryptoList",
  initialState: { data: null, isLoading: false, error: null },
  reducers: {},
  extraReducers: {
    [fetchCryptoList.fulfilled]: (state, action) => {
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
    [fetchCryptoList.pending]: (state, action) => {
      return {
        ...state,
        isLoading: true,
      
      };
    },

    [fetchCryptoList.rejected]: (state, action) => {
      return {
        data : null,
        isLoading: false,
        error: "An unexpected error occured. Please refresh the page!",
      };
    },
  },
});

export default getCryptoList;
