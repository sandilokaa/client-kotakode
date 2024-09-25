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

  const [query, setQuery] = useState<StaffBrowseRequest>({
    page: 0,
    pageSize: 5,
    firstName: '',
  })

  const { data: staffs, isLoading, refetch } = useGetListStaffsQuery(query)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const firstName = formData.get('firstName') as string
    
    setQuery((prev) => {

      const newQuery = {
        ...prev,
        firstName,
      }

      return newQuery
    })

    refetch()
  }

  const handleClearSearch = () => {
    router.push('/staffs').then(() => {
      window.location.reload()
  })
  }

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

          <div className='mt-6 flex justify-start px-6 py-2'>
            <div className='flex'>
              <form onSubmit={handleSearch} className="mx-auto flex max-w-sm items-center gap-2"> 
                  <div className="relative w-full">
                      <input type="text" name="firstName" className="ps-10 light:border-gray-600 light:bg-transparent light:text-black light:placeholder:text-gray-400 light:focus:border-gray-500 light:focus:ring-gray-500 block w-60 rounded-lg border border-gray-300  bg-gray-50 p-2.5 text-sm text-black focus:border-gray-500 focus:ring-gray-500" placeholder="Search name..." autoComplete='off' />
                  </div>
                  <button type="submit" className="ms-2 rounded-lg border border-black bg-black p-3 text-sm font-medium text-white focus:outline-none focus:ring-1 focus:ring-black dark:bg-black dark:focus:ring-black">
                      <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                      <span className="sr-only">Search</span>
                  </button>
                  <button onClick={handleClearSearch} type="button" className="ms-2 rounded-lg border border-black bg-black p-3 text-sm font-medium text-white focus:outline-none focus:ring-1 focus:ring-black dark:bg-black dark:focus:ring-black">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    <span className="sr-only">Clear</span>
                  </button>
              </form>
            </div>
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
