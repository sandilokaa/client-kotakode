import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React, { FC,  useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import Language from '@/components/Language'
import Logout from '@/components/Logout'
import Blank from '@/layouts/Blank'
import { useGetDetailStaffQuery, useStaffUpdateMutation } from '@/services/staffs'
import { StaffFormUpdate } from '@/types/staff'

const StaffUpdate: FC = () => {
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()

    const { t } = useTranslation(['common', 'staff'])

    const { data } = useGetDetailStaffQuery(String(router.query.id))

    const { register, handleSubmit } = useForm<StaffFormUpdate>({
        mode: 'onChange',
    })

    const [doUpdate, { isSuccess, isError }] = useStaffUpdateMutation()

    const onSubmit: SubmitHandler<StaffFormUpdate> = async (staffData) => {
        const id = String(router.query.id)

        const payload = {
            id: id,
            data: {
                attributes: {
                    ...staffData,
                },
            },
        }

        await doUpdate({ id, data: payload })
    }

    useEffect(() => {
        if (isSuccess) {
            enqueueSnackbar('Successfully updated data!', {
                variant: 'success',
                anchorOrigin: { vertical: 'top', horizontal: 'center' },
                autoHideDuration: 3000,
            })
            router.push('/staffs')
        }
        
        if (isError) {
            enqueueSnackbar('Data is not yours!', {
                variant: 'error',
                anchorOrigin: { vertical: 'top', horizontal: 'center' },
                autoHideDuration: 3000,
            })
            router.push('/staffs')
        }
    }, [isSuccess, isError])

    return (
        <Blank title={t('staff:update')}>
            <main className='min-h-screen bg-gray-100'>
                <section className='mx-auto min-h-screen max-w-screen-sm bg-white py-10'>
                    <div className='flex flex-row items-center justify-between px-6 text-center'>
                        <div className='flex'>
                        <h1 className='font-primary text-2xl font-bold md:text-4xl'>Update Data</h1>
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
                        </div>
                    </div>
                    
                    <div className='mt-10 flex flex-col gap-4 px-6 py-5'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex flex-col gap-4'>
                                <div className='flex flex-col gap-4'>
                                    <div>
                                        <label htmlFor='username' className="mb-1 block text-sm font-medium text-gray-700">
                                            Username
                                        </label>
                                        <input
                                            {...register('username')}
                                            type="text"
                                            defaultValue={data?.data?.[0]?.attributes?.username ?? 'Loading...'}
                                            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div>
                                        <label htmlFor='first-name' className="mb-1 block text-sm font-medium text-gray-700">
                                            First Name
                                        </label>
                                        <input
                                            {...register('firstName')}
                                            type="text"
                                            defaultValue={data?.data?.[0]?.attributes?.firstName ?? 'Loading...'}
                                            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='last-name' className="mb-1 block text-sm font-medium text-gray-700">
                                            Last Name
                                        </label>
                                        <input
                                            {...register('lastName')}
                                            type="text"
                                            defaultValue={data?.data?.[0]?.attributes?.lastName ?? 'Loading...'}
                                            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div>
                                        <label htmlFor='staff-id' className="mb-1 block text-sm font-medium text-gray-700">
                                            Staff Id
                                        </label>
                                        <input
                                            {...register('staffId')}
                                            type="text"
                                            defaultValue={data?.data?.[0]?.attributes?.staffId ?? 'Loading...'}
                                            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='last-name' className="mb-1 block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <input
                                            {...register('email')}
                                            type="email"
                                            defaultValue={data?.data?.[0]?.attributes?.email ?? 'Loading...'}
                                            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <div>
                                        <label htmlFor='username' className="mb-1 block text-sm font-medium text-gray-700">
                                            Password
                                        </label>
                                        <input
                                            {...register('password')}
                                            type="password"
                                            placeholder="Enter your new password"
                                            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='mt-8 flex flex-row justify-end'>
                                <div>
                                    <button type='submit' className='rounded-md bg-blue-500 py-2 px-3 font-bold text-white hover:bg-blue-600'>Save Changes</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </Blank>
    )
}

export default StaffUpdate
