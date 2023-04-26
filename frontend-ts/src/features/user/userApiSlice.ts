import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../app/store';

export interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

export interface Profile {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export const userApiSlice = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/users',
    prepareHeaders(headers, api) {
      const token = (api.getState() as RootState).auth.user?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
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

      updateUserProfile: builder.mutation<
        User,
        { name?: string; email?: string; password?: string }
      >({
        query({ name, email, password }) {
          return {
            url: '/profile',
            method: 'PUT',
            body: { name, email, password },
          };
        },
      }),

      profileUser: builder.query<Profile, boolean | void>({
        query() {
          return '/profile';
        },
      }),
    };
  },
});

export const {
  useFetchUserMutation,
  useRegisterUserMutation,
  useUpdateUserProfileMutation,
  useProfileUserQuery,
} = userApiSlice;
