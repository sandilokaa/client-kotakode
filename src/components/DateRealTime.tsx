import moment from 'moment'
import React, { useEffect, useState } from 'react'

const DateRealTimeComponent = () => {
  const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'))

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(moment().format('YYYY-MM-DD'))
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <p className='font-primary font-medium text-gray-500 md:text-sm'>
      {currentDate}
    </p>
  )
}

export default DateRealTimeComponent