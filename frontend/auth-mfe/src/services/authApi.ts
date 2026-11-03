import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: "/login", //POST
        method: "POST",
        body: credentials, //request bosy sent to backend
      }),
    }),
    register: builder.mutation({
      query: (user: { name: string; email: string; password: string }) => ({
        url: "/register",
        method: "POST",
        body: user,
      }),
    }),
    profile: builder.query<unknown, void>({
      query: () => "/profile",
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLazyProfileQuery,
  useLogoutMutation,
} = authApi;
