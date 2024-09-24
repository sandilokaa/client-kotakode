import React, { FC, useState } from 'react'

import AttendanceModal from '@/components/AttendanceModal'
import { useGetAttendanceByStaffIdQuery } from '@/services/attendances'

const AttendanceClockOut: FC = () => {

    const { data: attendanceData } = useGetAttendanceByStaffIdQuery()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedModalId, setSelectedModalId] = useState<string | null>(null)

    const openModal = (id: string) => {
        setSelectedModalId(id)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setSelectedModalId(null)
        setIsModalOpen(false)
    }

    return (
        <div className='mt-6 px-6 py-2'>
            <div className='mt-6 flex flex-col'>
                <div>
                    <h1 className='text-lg font-bold'>Last Activity</h1>
                </div>

                <div className='mt-6 grid grid-cols-2 gap-4'>
                    {attendanceData?.data.map((data) => (    
                        <div className='rounded-md bg-gray-100 p-4' key={data.attributes.id}>
                            {data.attributes.clockOut === null ? (
                                <div>
                                    <div className='flex gap-4'>
                                        <h1 className='font-bold text-red-500'>{data.attributes.clockIn.split('T')[0]}</h1>
                                        <h1 className='text-red-500'>Not submitted</h1>
                                    </div>
                                    <div>
                                        <button className='absolute translate-y-[-50px] translate-x-[255px] cursor-pointer rounded-full bg-blue-100 p-2 hover:bg-blue-200' onClick={() => openModal(data.attributes.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3">
                                                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className='grid grid-cols-2 gap-x-2'>
                                    <div className='flex flex-col gap-y-2'>
                                        {data.attributes.clockOut === null ? (
                                            null
                                        ) : (
                                            <h1 className='text-md font-medium'>{data.attributes.clockOut.split('T')[0]}</h1>
                                        )}
                                    </div>
                                    <div className='flex flex-col gap-y-2 text-right'>
                                        {data.attributes.clockOut === null ? (
                                            null
                                        ) : (
                                            <h1 className='text-md font-medium'>{data.attributes.clockOut.split('T')[1]}</h1>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <AttendanceModal isOpen={isModalOpen} onClose={closeModal} id={selectedModalId ?? ''} />
            </div>
        </div>
    )
}

export default AttendanceClockOut
