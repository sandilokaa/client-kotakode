import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Language from '@/components/Language'
import Logout from '@/components/Logout'
import Skeleton from '@/components/Skeleton'
import Blank from '@/layouts/Blank'
import { useGetListStaffsQuery } from '@/services/staffs'
import { StaffBrowseRequest } from '@/types/staff'

const StaffList: FC = () => {
  const router = useRouter()
  const { t } = useTranslation(['common', 'staff'])

  const [query] = useState<StaffBrowseRequest>({
    page: 0,
    pageSize: 5,
  })

  const { data: staffs, isLoading } = useGetListStaffsQuery(query)

  return (
    <Blank title={t('staff:title')}>
      <main className='min-h-screen bg-gray-100'>
        <section className='mx-auto min-h-screen max-w-screen-sm bg-white py-10'>
          <div className='flex flex-row items-center justify-between px-6 text-center'>
              <div className='flex'>
              <h1 className='font-primary text-2xl font-bold md:text-4xl'>{t('staff:title')}</h1>
              </div>
              <div className='flex gap-4'>
              <Language />
              <Logout />
              </div>
          </div>

          <div className='flex flex-row justify-start px-6 pt-8 pb-4'>
              <Link href={{ pathname: '/', query: { lang: router.query.lang } }}>
                  <div className='flex cursor-pointer'>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5">
                          <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
                      </svg>
                      <p className='text-sm font-medium'>
                          {t('common:backTo', { page: t('common:titles.home') })}
                      </p>
                  </div>
              </Link>
          </div>

          <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 px-6 sm:grid-cols-1 lg:grid-cols-2'>
            {isLoading &&
              [1, 2, 3, 4].map((_, idx) => (
                <Skeleton
                  className='h-40 rounded-md'
                  key={idx}
                />
              ))}

            {staffs?.data?.map(({ attributes }, index: number) => (
              <div
                key={index}
                className='group relative cursor-pointer'
              >
                <div className='min-h-40 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-40 '>
                  <img
                    src={`https://ui-avatars.com/api/?name=${attributes.firstName}+${attributes.lastName}&background=0D8ABC&color=fff`}
                    alt={attributes.fullName}
                    className='h-full w-full object-cover object-center lg:h-full lg:w-full'
                    loading='lazy'
                  />
                </div>

                <div className='mt-4'>
                  <h3 className='text-primary text-md font-bold'>
                    <Link href={{ pathname: `/staffs/${attributes.id}`, query: { lang: router.query.lang } }}>
                      <p>
                        <span
                          aria-hidden='true'
                          className='absolute inset-0'
                        />
                        {attributes.firstName} {attributes.lastName}
                      </p>
                    </Link>
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </Blank>
  )
}

export default StaffList
