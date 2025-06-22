import React from 'react'

const StatsCard = ({title, value, color}) => {
  return (
    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm shadow-lg rounded-lg border border-slate-200/50 dark:border-slate-700/50">
    <div className="p-6 text-center">
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-sm text-slate-600 dark:text-slate-400">{title}</div>
    </div>
  </div>
  )
}

export default StatsCard
