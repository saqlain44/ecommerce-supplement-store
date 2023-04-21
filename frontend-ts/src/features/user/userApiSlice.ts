import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

export const userApiSlice = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/users',
  }),
  endpoints(builder) {
    return {
      fetchUser: builder.mutation<User, { email: string; password: string }>({
        query({ email, password }) {
          return {
            url: '/login',
            method: 'POST',
            body: { email, password },
          };
        },
      }),

      registerUser: builder.mutation<
        User,
        { name: string; email: string; password: string }
      >({
        query({ name, email, password }) {
          return {
            url: '/',
            method: 'POST',
            body: { name, email, password },
          };
        },
      }),
    };
  },
});

export const { useFetchUserMutation, useRegisterUserMutation } = userApiSlice;
