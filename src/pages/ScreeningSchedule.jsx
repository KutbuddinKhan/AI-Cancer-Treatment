import React from 'react'
import { useLocation } from 'react-router-dom'
import KanbanBoard from '../components/KanbanBoard'

const ScreeningSchedule = () => {
    const state = useLocation()
  return (
    <div className='w-full overflow-auto'>
      <KanbanBoard state={state}/>
    </div>
  )
}

export default ScreeningSchedule
