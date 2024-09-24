import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import DateRealTimeComponent from '@/components/DateRealTime'
import Language from '@/components/Language'
import Logout from '@/components/Logout'
import Blank from '@/layouts/Blank'
import { useGetSelfUserMutation } from '@/services/auth'
import { useGetListStaffsQuery } from '@/services/staffs'

import ImageOne from '../../assets/images/image-1.png'

const Home: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation(['common', 'home'])

  const [getSelfUser, {data: userData}] = useGetSelfUserMutation()

  useEffect(() => {
    const getData = async () => {
      try {
        await getSelfUser().unwrap()
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to get data: ', error)
      }
    }
    
    getData()
  }, [getSelfUser])

  const { data: staffsData } = useGetListStaffsQuery({ page: 1, pageSize: 10000 })

  return (
    <Blank title={t('home:title')}>
      <main className='min-h-screen bg-gray-100'>
        <section className='mx-auto min-h-screen max-w-screen-sm bg-white py-10'>
          <div className='flex flex-row items-center justify-between px-6 text-center'>
            <div className='flex'>
              <h1 className='font-primary text-2xl font-bold md:text-4xl'>{t('common:titles.home')}</h1>
            </div>
            <div className='flex gap-4'>
              <Language />
              <Logout />
            </div>
          </div>

          <div className='mt-8 flex'>
            <div className='w-full py-5 px-6'>
              { userData && (
                <h1 className='font-primary font-bold md:text-3xl'>Hello, {userData?.data[0]?.attributes?.username || 'Guest'}!</h1>
              )}
              <p className='font-primary mt-2 font-medium text-gray-500'>Is it time to update your attendance for today?</p>
            </div>
          </div>

          <div className='mt-4 px-6 pt-12 pb-6'>
            <div className='rounded-lg bg-blue-100 px-5 py-10'>
              <div className='grid grid-cols-2 gap-10'>
                <div className='relative'>
                  <div className='absolute translate-y-[-104px]'>
                    <Image
                      src={ImageOne}
                      alt='Image'
                      width={220}
                      height={280}
                    />
                  </div>
                </div>
                <div className='flex flex-col content-center gap-2'>
                  <h1 className='font-primary font-bold md:text-base'>Stay updated with the latest news!</h1>
                  <p className='md:text-sm'>Stay updated with the latest news on our dedicated staff. Whether youre tracking performance, and monitoring schedules.</p>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-4'>
            <div className='px-6'>
              <h1 className='font-primary font-bold md:text-2xl'>Categories</h1>
            </div>
            <div className='mt-6 grid grid-cols-2 gap-5 px-6'>
              <div>
                <Link
                  href={{ pathname: '/staffs', query: { lang: router.query.lang } }}
                  locale={router.locale}
                >
                  <div className='flex h-full cursor-pointer gap-4 rounded-lg bg-green-100 p-5 hover:drop-shadow-xl'>
                    <div className='content-center rounded-md bg-green-300 p-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8">
                      <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
                      <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                    </svg>

                    </div>
                    <div className='content-center'>
                      <h1 className='font-primary font-bold md:text-lg'>
                        {t('home:staffList')}
                      </h1>
                      <p className='font-primary font-medium text-gray-500 md:text-sm'>{staffsData?.count} Staff</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div>
                <Link
                  href={{ pathname: '/attendances', query: { lang: router.query.lang } }}
                  locale={router.locale}
                >
                  <div className='flex h-full cursor-pointer gap-4 rounded-lg bg-purple-100 p-5 hover:drop-shadow-xl'>
                    <div className='content-center rounded-md bg-purple-300 p-2'>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8">
                        <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                        <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className='content-center'>
                      <h1 className='font-primary font-bold md:text-lg'>
                        Attendance
                      </h1>
                      <DateRealTimeComponent />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Blank>
  )
}

export default Home
