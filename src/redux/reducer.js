import { configureStore, combineReducers } from "@reduxjs/toolkit";
import getCryptoHistory from "./detailPageHistorySlice";
import getCryptoInfo from "./detailPageInfoSlice";
import setCurrency from "./currencySlice";
import getCryptoList from "./cryptoListSlice";

const rootReducer = combineReducers({
  cryptoHistory: getCryptoHistory.reducer,
  cryptoInfo: getCryptoInfo.reducer,
  currency: setCurrency.reducer,
  cryptoList: getCryptoList.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
