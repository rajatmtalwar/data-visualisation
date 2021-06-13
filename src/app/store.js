import { configureStore } from "@reduxjs/toolkit";
import analyticsReducer from "../features/visualise/analyticsSlice";

export const store = configureStore({
  reducer: {
    analytics: analyticsReducer,
  },
});
