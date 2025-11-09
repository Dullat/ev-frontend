import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import { stationApiBase, userApiBase } from "../services/api.js";

const store = configureStore({
  reducer: {
    user: userSlice,
    [stationApiBase.reducerPath]: stationApiBase.reducer,
    [userApiBase.reducerPath]: userApiBase.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(userApiBase.middleware)
      .concat(stationApiBase.middleware);
  },
  devTools: true,
});

export default store;
