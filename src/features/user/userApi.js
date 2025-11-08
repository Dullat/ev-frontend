import { userApiBase } from "../../services/api";

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
        url: "auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogOutMutation } = userApi;
export default userApi;
