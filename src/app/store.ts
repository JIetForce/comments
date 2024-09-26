import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "../features/comments/commentsSlice";

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
