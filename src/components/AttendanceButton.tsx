import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React, { FC, useEffect,useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useCreateClockInMutation } from '@/services/attendances'
import { AttendanceFromCreate } from '@/types/attendance'

const AttendanceButton: FC = () => {
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()

    const [showForm, setShowForm] = useState(false)

    const handleClick = () => {
        setShowForm(!showForm)
    }

    const { register, handleSubmit } = useForm<AttendanceFromCreate>({
        mode: 'onChange',
    })

    const [doCreate, { isSuccess }] = useCreateClockInMutation()

    const onSubmit: SubmitHandler<AttendanceFromCreate> = async (attendanceData) => {
        const payload = {
            data: {
                attributes: {
                    ...attendanceData,
                },
            },
        }

        await doCreate({ data: payload })
    }

    useEffect(() => {
        if (isSuccess) {
            enqueueSnackbar('Successfully created data!', {
                variant: 'success',
                anchorOrigin: { vertical: 'top', horizontal: 'center' },
                autoHideDuration: 3000,
            })
            router.push('/attendances').then(() => {
                window.location.reload()
            })
        }
    }, [isSuccess])

    return (
        <div>
            <div className='grid grid-cols-3'>
                <button className='cursor-pointer rounded-md bg-gray-100 p-3' onClick={handleClick} tabIndex={0}>
                    <p className='text-center text-sm font-medium'>Click to Add</p>
                </button>
            </div>

            {showForm && (
                <div className='mt-4'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex gap-4'>
                            <div>
                                <label className='mb-2 block text-sm text-black' htmlFor='date'>
                                    Date
                                </label>
                                <input
                                    {...register('clockIn', { required: true })}
                                    type='datetime-local'
                                    id='date'
                                    className='h-10 appearance-none rounded border py-2 px-3 text-gray-500'
                                />
                            </div>
                            <div className='mt-auto'>
                                <button type='submit' className='h-10 w-28 rounded-md bg-blue-500 py-2 px-3 font-bold text-white hover:bg-blue-600'>Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default AttendanceButton
