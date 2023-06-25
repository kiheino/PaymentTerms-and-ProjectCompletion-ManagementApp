import { configureStore } from "@reduxjs/toolkit";
import submitReducer from "./features/SubmitSlice";
import homeReducer from "./features/homeSlice";

export const store = configureStore({
  reducer: {
    submit: submitReducer,
    homeManagement: homeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
