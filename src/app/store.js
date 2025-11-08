import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import userApi from "../features/user/userApi";

const store = configureStore({
  reducer: {
    user: userSlice,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(userApi.middleware);
  },
  devTools: true,
});

export default store;
