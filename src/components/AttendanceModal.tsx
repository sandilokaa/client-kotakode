import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React, { FC, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useUpdateClockOutMutation } from '@/services/attendances'
import { AttendanceFromUpdate } from '@/types/attendance'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    id: string;
}

const AttendanceModal: FC<ModalProps> = ({ isOpen, onClose, id }) => {

    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()

    const { register, handleSubmit } = useForm<AttendanceFromUpdate>({
        mode: 'onChange',
    })

    const [doUpdate, { isSuccess }] = useUpdateClockOutMutation()

    const onUpdate: SubmitHandler<AttendanceFromUpdate> = async (attendanceData) => {        
        const payload = {
            id,
            data: {
                attributes: {
                    ...attendanceData,
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
            router.push('/attendances').then(() => {
                window.location.reload()
            })
        }
    }, [isSuccess])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-lg font-semibold">Form Submit</h2>
                <form onSubmit={handleSubmit(onUpdate)}>
                    <div className='flex gap-4'>
                        <div>
                            <label className='mb-2 block text-sm text-black' htmlFor='date'>
                                Date
                            </label>
                            <input
                                {...register('clockOut', { required: true })}
                                type='datetime-local'
                                id='date'
                                className='h-10 appearance-none rounded border py-2 px-3 text-gray-500'
                            />
                        </div>
                    </div>
                
                    <div className="mt-6 flex justify-end gap-2">
                        <button
                            onClick={onClose}
                            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                        >
                            Close
                        </button>
                        <button
                            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AttendanceModal