import attendance from '@/services/attendances'
import auth from '@/services/auth'
import staff from '@/services/staffs'

const rootServices = {
  reducers: {
    // staff
    [staff.reducerPath]: staff.reducer,
    [auth.reducerPath]: auth.reducer,
    [attendance.reducerPath]: attendance.reducer,
  },
  middlewares: [
    // staff
    staff.middleware,
    auth.middleware,
    attendance.middleware,
  ],
}

export default rootServices
