import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Language from '@/components/Language'
import Logout from '@/components/Logout'
import Blank from '@/layouts/Blank'
import { useGetDetailStaffQuery } from '@/services/staffs'

const StaffDetail: FC = () => {
  const router = useRouter()
  const { t } = useTranslation(['common', 'staff'])

  const { data } = useGetDetailStaffQuery(String(router.query.id))


  return (
    <Blank title={data?.data?.[0]?.attributes?.firstName ?? 'Loading...'}>
      <main className='min-h-screen bg-gray-100'>
        <section className='mx-auto min-h-screen max-w-screen-sm bg-white py-10'>
          <div className='flex flex-row items-center justify-between px-6 text-center'>
              <div className='flex'>
              <h1 className='font-primary text-2xl font-bold md:text-4xl'>{data?.data?.[0]?.attributes?.firstName ?? 'Loading...'}</h1>
              </div>
              <div className='flex gap-4'>
              <Language />
              <Logout />
              </div>
          </div>

          <div className='flex flex-row justify-start px-6 pt-8 pb-4'>
              <Link href={{ pathname: '/staffs', query: { lang: router.query.lang } }}>
                  <div className='flex cursor-pointer'>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5">
                          <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
                      </svg>
                      <p className='text-sm font-medium'>
                          {t('common:backTo', { page: t('common:titles.staff') })}
                      </p>
                  </div>
              </Link>
          </div>

          <div className='mt-6 grid w-full place-items-center px-6'>
            <div className='group relative'>
              <div className='aspect-w-1 aspect-h-1 h-40 w-40 overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-40'>
                <img
                  src={`https://ui-avatars.com/api/?name=${data?.data?.[0].attributes?.firstName}+${data?.data?.[0].attributes?.lastName}&background=0D8ABC&color=fff`}
                  alt={data?.data?.[0]?.attributes?.firstName}
                  className='h-full w-full object-cover object-center lg:h-full lg:w-full'
                  loading='lazy'
                />
              </div>
              <div>
                <Link href={{ pathname: `/staffs/update/${data?.data?.[0].attributes?.id}`, query: { lang: router.query.lang } }}>
                  <div className='absolute translate-y-[-25px] translate-x-[130px] cursor-pointer rounded-full bg-gray-100 p-2 hover:bg-gray-200'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6">
                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                      <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className='mt-10 flex flex-col gap-4 px-6'>
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
        </section>
      </main>
    </Blank>
  )
}

export default StaffDetail
