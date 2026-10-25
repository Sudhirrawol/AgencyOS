import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/auth",
        credentials: "include",
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials: { email: string; password: string }) => ({
                url: '/login', //POST 
                method: "POST",
                body: credentials //request bosy sent to backend
            })
        }),
        register: builder.mutation({
            query: (user: { name: string, email: string, password: string }) => ({
                url: "/register",
                method: "POST",
                body: user
            })
        }),
        profile:builder.query<unknown , void>({
            query:()=>"/profile"
        })
    })
})

export const { useLoginMutation , useRegisterMutation , useLazyProfileQuery } = authApi;