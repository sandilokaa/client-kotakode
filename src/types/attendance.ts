import { BaseRequest, BaseResponse, Meta } from '@/types/common'

export interface Attendance {
    type: string
    id: string
    staffId: string
    clockIn: string
    clockOut: string
}

export interface AttendanceFromCreate {
    id: string
    staffId: string
    clockIn: string
    clockOut: string
}

export interface AttendanceFromUpdate {
    id: string
    staffId: string
    clockIn: string
    clockOut: string
}

export type AttendanceFormRequest = BaseRequest<AttendanceFromCreate>
export type AttendanceFormUpdateRequest = BaseRequest<AttendanceFromUpdate>
export type AttendanceDetailResponse = BaseResponse<Attendance>