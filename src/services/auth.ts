import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { AuthMeResponse,AuthRequest, AuthResponse } from '@/types/auth'
import { apiBaseQuery } from '@/utils/api'

const api = createApi({
  reducerPath: 'auth',
  baseQuery: apiBaseQuery,
  tagTypes: ['Auth', 'AuthMe'],
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 259200, // 3 days
  endpoints: (builder) => ({
    postLogin: builder.mutation<AuthResponse, AuthRequest>({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),
    postLogout: builder.mutation<AuthResponse, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),
    getSelfUser: builder.mutation<AuthMeResponse, void>({
      query: () => ({
        url: '/auth/selfUser',
        method: 'GET',
        providesTags: ['AuthMe']
      }),
    })
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
})

// Export hooks for usage in functional components
export const { usePostLoginMutation, usePostLogoutMutation, useGetSelfUserMutation } = api

export default api
