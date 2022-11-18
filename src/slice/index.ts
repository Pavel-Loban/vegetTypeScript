import { configureStore } from "@reduxjs/toolkit";
import orderCreatorSliceReducer from "./orderCreatorSlice";
import userSliceReducer from "./userSlice";
import sortSliceReducer from "./sortSlice";


export const store = configureStore({
  reducer: {
    orderCreator: orderCreatorSliceReducer,
    user: userSliceReducer,
    sort: sortSliceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>