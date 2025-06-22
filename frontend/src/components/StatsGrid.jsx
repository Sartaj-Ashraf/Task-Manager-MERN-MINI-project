import React from 'react'
import StatsCard from './StatsCard'

const StatsGrid = ({stats}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    <StatsCard title="Total Tasks" value={stats.total} color="text-blue-600 dark:text-blue-400" />
    <StatsCard title="Active" value={stats.active} color="text-orange-600 dark:text-orange-400" />
    <StatsCard title="Completed" value={stats.completed} color="text-green-600 dark:text-green-400" />
  </div>
  )
}

export default StatsGrid
