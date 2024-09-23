import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import React from 'react'

import { USER_ACCESS_TOKEN } from '@/config/token'
import { usePostLogoutMutation } from '@/services/auth'
function Logout() {

  const router = useRouter()
  const [doLogout] = usePostLogoutMutation()

  const onLogout = async () => {
    try {

      const response = await doLogout().unwrap()

      if (response) {
        deleteCookie(USER_ACCESS_TOKEN)
        router.push('/login')
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Logout failed: ', error)
    }
  }

  return (
    <button onClick={onLogout} className="flex justify-center gap-2 rounded-md bg-zinc-100 p-2 hover:bg-zinc-200">
      <div className='flex self-center'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
        </svg>
      </div>
      <div className='flex self-center'>
        <p className='md:text-sm'>Logout</p>
      </div>
    </button>
  )
}
  
export default Logout