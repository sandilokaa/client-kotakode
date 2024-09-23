import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Language from '@/components/Language'
import Logout from '@/components/Logout'
import Blank from '@/layouts/Blank'

import AllAttendance from './AllAttendance'
import AttendanceClockIn from '../clock-in/AttendanceClockIn'
import AttendanceClockOut from '../clock-out/AttendanceClockOut'

const Attendance: FC = () => {
    const router = useRouter()
    const { t } = useTranslation(['common', 'attendance'])

    const [activeButton, setActiveButton] = useState<string | null>(null)

    useEffect(() => {
        if (activeButton === null) {
            setActiveButton('All')
        }
    }, [activeButton])

    const handleClick = (buttonName: string) => {
        setActiveButton(buttonName)
    }

    return (
        <Blank title={t('attendance:title')}>
            <main className='min-h-screen bg-gray-100'>
                <section className='mx-auto min-h-screen max-w-screen-sm bg-white py-10'>
                    <div className='flex flex-row items-center justify-between px-6 text-center'>
                        <div className='flex'>
                        <h1 className='font-primary text-2xl font-bold md:text-4xl'>{t('attendance:title')}</h1>
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

                    <div className='mt-6 flex flex-row gap-4 px-6'>
                        <button
                            className={`w-28 rounded-md px-3 py-2 text-sm font-medium ${activeButton === 'All' ? 'bg-blue-400 text-white' : 'text-black ring-1 ring-gray-300'}`}
                            onClick={() => handleClick('All')}
                        >
                            All
                        </button>
                        <button
                            className={`w-28 rounded-md px-3 py-2 text-sm font-medium ${activeButton === 'Clock In' ? 'bg-blue-400 text-white' : 'text-black ring-1 ring-gray-300'}`}
                            onClick={() => handleClick('Clock In')}
                        >
                            Clock In
                        </button>
                        <button
                            className={`w-28 rounded-md px-3 py-2 text-sm font-medium ${activeButton === 'Clock Out' ? 'bg-blue-400 text-white' : 'text-black ring-1 ring-gray-300'}`}
                            onClick={() => handleClick('Clock Out')}
                        >
                            Clock Out
                        </button>
                    </div>

                    <div>
                        {activeButton && (
                            <div>
                                {activeButton === 'All' && (
                                    <AllAttendance />
                                )}
                                {activeButton === 'Clock In' && (
                                    <AttendanceClockIn />
                                )}
                                {activeButton === 'Clock Out' && (
                                    <AttendanceClockOut />
                                )}
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </Blank>
    )
}

export default Attendance
