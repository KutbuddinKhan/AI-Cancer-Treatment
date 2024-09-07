import React from 'react'
import { useLocation } from 'react-router-dom'

const ScreeningSchedule = () => {
    const state = useLocation()
  return (
    <div className='w-full hide-scrollbar overflow-auto'>
      <p>Kanban board</p>
    </div>
  )
}

export default ScreeningSchedule
