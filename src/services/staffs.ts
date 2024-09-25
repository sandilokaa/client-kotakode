import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { StaffBrowseRequest, StaffBrowseResponse, StaffDetailResponse, StaffFormUpdateRequest } from '@/types/staff'
import { apiBaseQuery } from '@/utils/api'

const api = createApi({
  reducerPath: 'staff',
  baseQuery: apiBaseQuery,
  tagTypes: ['Staff'],
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 259200, // 3 days
  endpoints: (builder) => ({
    getListStaffs: builder.query<StaffBrowseResponse, StaffBrowseRequest>({
      query: ({ email, firstName, ...params}) => ({
        params: {
          email,
          firstName,
          ...params
        },
        url: '/staffs',
        providesTags: ['Staff'],
      }),
    }),
    getDetailStaff: builder.query<StaffDetailResponse, string>({
      query: (id) => ({
        url: `/staffs/${id}`,
        providesTags: ['Staff'],
      }),
    }),

    staffUpdate: builder.mutation<void, { id: string; data: StaffFormUpdateRequest }>({
      query: ({ id, data }) => ({
        url: `/staffs/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Staff'],
    }),
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
})

// Export hooks for usage in functional components
export const { useGetListStaffsQuery, useGetDetailStaffQuery, useStaffUpdateMutation ,util: exampleUtil } = api

export default api
