import { userApiBase } from "../../services/api";
import { logOut as logOutAction, setUser } from "./userSlice";

const userApi = userApiBase.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { email, password },
      }),
    }),
    logOut: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logOutAction());
        } catch (error) {
          console.log("Logout failed", error);
        }
      },
    }),
    refresh: builder.query({
      query: () => ({
        url: "/auth/me",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setUser(result.data.user));
          return;
        } catch (error) {
          console.log("Logout failed", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogOutMutation, useRefreshQuery } = userApi;
export default userApi;
