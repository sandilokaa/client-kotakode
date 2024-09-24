import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { AttendanceDetailResponse, AttendanceFormRequest, AttendanceFormUpdateRequest } from '@/types/attendance'
import { apiBaseQuery } from '@/utils/api'

const api = createApi({
    reducerPath: 'attendance',
    baseQuery: apiBaseQuery,
    tagTypes: ['Attendance'],
    refetchOnMountOrArgChange: true,
    keepUnusedDataFor: 259200, // 3 days
    endpoints: (builder) => ({
        getAttendanceByStaffId: builder.query<AttendanceDetailResponse, void>({
            query: () => ({
                url: '/attendances/self', 
                providesTags: ['Attendance'],
            }),
        }),
        getAttendanceStaff: builder.query<AttendanceDetailResponse, string>({
            query: (staffId) => ({
                url: `/attendances/${staffId}/staff`, 
                providesTags: ['Attendance'],
            }),
        }),
        createClockIn: builder.mutation<void, { data: AttendanceFormRequest }>({
            query: ({data}) => ({
                url: '/attendances/clock-in',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Attendance'],
        }),
        updateClockOut: builder.mutation<void, { id:string, data: AttendanceFormUpdateRequest }>({
            query: ({id, data}) => ({
                url: `/attendances/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Attendance'],
        }),
    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
})

// Export hooks for usage in functional components
export const { useGetAttendanceByStaffIdQuery, useGetAttendanceStaffQuery, useCreateClockInMutation, useUpdateClockOutMutation, util: exampleUtil } = api

export default api
