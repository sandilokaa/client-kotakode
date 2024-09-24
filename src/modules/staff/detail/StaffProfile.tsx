import { useRouter } from 'next/router'
import React, { FC } from 'react'

import { useGetDetailStaffQuery } from '@/services/staffs'

const StaffProfile: FC = () => {

    const router = useRouter()
    const { data } = useGetDetailStaffQuery(String(router.query.id))

    return (
        <div className='mt-6 flex flex-col gap-4 px-6'>
            <div className='flex flex-col gap-2'>
                <h3 className='text-md font-bold'>Fullname</h3>
                <p className='text-md text-gray-700'>{data?.data?.[0]?.attributes?.fullName ?? 'Loading...'}</p>
            </div>
            <div className='flex flex-col gap-2'>
                <h3 className='text-md font-bold'>Username</h3>
                <p className='text-md text-gray-700'>{data?.data?.[0]?.attributes?.username ?? 'Loading...'}</p>
            </div>
            <div className='grid grid-cols-2'>
                <div className='flex flex-col gap-2'>
                <h3 className='text-md font-bold'>First Name</h3>
                <p className='text-md text-gray-700'>{data?.data?.[0]?.attributes?.firstName ?? 'Loading...'}</p>
                </div>
                <div className='flex flex-col gap-2'>
                <h3 className='text-md font-bold'>Last Name</h3>
                <p className='text-md text-gray-700'>{data?.data?.[0]?.attributes?.lastName ?? 'Loading...'}</p>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <h3 className='text-md font-bold'>Email</h3>
                <p className='text-md text-gray-700'>{data?.data?.[0]?.attributes?.email ?? 'Loading...'}</p>
            </div>
        </div>
    )
}

export default StaffProfile
