import React, { FC } from 'react'

// import AttendanceButton from '@/components/AttendanceButton'
import { useGetAttendanceByStaffIdQuery } from '@/services/attendances'

const AttendanceClockOut: FC = () => {

    const { data: attendanceData } = useGetAttendanceByStaffIdQuery()

    return (
        <div className='mt-6 px-6 py-2'>
            
            {/* <AttendanceButton /> */}

            <div className='mt-6 flex flex-col'>
                <div>
                    <h1 className='text-lg font-bold'>Last Activity</h1>
                </div>

                <div className='mt-6 grid grid-cols-2 gap-4'>
                    {attendanceData?.data.map((data) => (    
                        <div className='rounded-md bg-gray-100 p-4' key={data.attributes.id}>
                            <div className='grid grid-cols-2 gap-x-2'>
                                <div className='flex flex-col gap-y-2'>
                                    {data.attributes.clockOut === null ? (
                                        <h1 className='text-md font-medium'>Not submitted</h1>
                                    ) : (
                                        <h1 className='text-md font-medium'>{data.attributes.clockOut.split('T')[0]}</h1>
                                    )}
                                </div>
                                <div className='flex flex-col gap-y-2 text-right'>
                                    {data.attributes.clockOut === null ? (
                                        <h1 className='text-md font-medium'>Not submitted</h1>
                                    ) : (
                                        <h1 className='text-md font-medium'>{data.attributes.clockOut.split('T')[1]}</h1>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AttendanceClockOut
