import { useRouter } from 'next/router'
import React, { FC } from 'react'

import { useGetAttendanceStaffQuery } from '@/services/attendances'

const StaffAttendance: FC = () => {

    const router = useRouter()
    
    const { data: attendanceData } = useGetAttendanceStaffQuery(String(router.query.id))

    return (
        <div className='mt-6 flex flex-col gap-4 px-6'>
            <div className='mt-6 grid grid-cols-2 gap-4'>
                {attendanceData?.data.map((data) => (    
                    <div className='rounded-md bg-gray-100 p-4' key={data.attributes.id}>
                        {data.attributes.clockIn === null ? (
                            <h1 className='text-sm font-medium text-gray-500'>Not submitted yet</h1>
                        ) : (
                            <h1 className='text-sm font-medium text-gray-500'>{data.attributes.clockIn.split('T')[0]}</h1>
                        )}
                        <div className='mt-2 grid grid-cols-2 gap-x-2'>
                            <div className='flex flex-col gap-y-2'>
                                {data.attributes.clockIn === null ? (
                                    <h1 className='text-md font-bold text-red-500'>Not submitted yet</h1>
                                ) : (
                                    <h1 className='text-md font-medium'>{data.attributes.clockIn.split('T')[1]}</h1>
                                )}
                                <p className='text-sm font-medium'>On going</p>
                            </div>
                            <div className='flex flex-col gap-y-2'>
                                {data.attributes.clockOut === null ? (
                                    <h1 className='text-md font-bold text-red-500'>Not submitted</h1>
                                ) : (
                                    <h1 className='text-md font-medium'>{data.attributes.clockOut.split('T')[1]}</h1>
                                )}
                                <p className='text-sm font-medium'>Go home</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StaffAttendance
