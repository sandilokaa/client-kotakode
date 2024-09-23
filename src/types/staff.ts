import { BaseRequest, BaseResponse, Meta } from '@/types/common'

// same with the attribute on responses
export interface Staff {
  type: string
  id: string
  staffId: string
  firstName: string
  lastName: string
  fullName: string
  email: string
  password: string
  username: string
}

export type StaffBrowseRequest = {
  page: number
  pageSize: number
}

export interface StaffFormUpdate {
  staffId: string
  firstName: string
  lastName: string
  fullName: string
  email: string
  password: string
  username: string
}

export type StaffFormUpdateRequest = BaseRequest<StaffFormUpdate>
export type StaffBrowseResponse = BaseResponse<Staff>
export type StaffDetailResponse = BaseResponse<Staff>
