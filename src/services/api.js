import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser, logOut } from "../features/user/userSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  credentials: "include",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refreshedResult = await baseQuery(
      { url: "/auth/refresh", method: "POST" },
      api,
      extraOptions,
    );

    if (refreshedResult?.data) {
      api.dispatch(setUser(refreshedResult.data.user));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const userApiBase = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["user"],
  endpoints: (builder) => ({}),
});

export const stationApiBase = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["station"],
  endpoints: (builder) => ({}),
});
