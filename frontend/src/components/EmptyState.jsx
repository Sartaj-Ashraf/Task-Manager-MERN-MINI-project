import React from 'react'
import { Calendar } from 'lucide-react'

const EmptyState = ({searchTerm,filter}) => {
  return (
    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm shadow-lg rounded-lg border border-slate-200/50 dark:border-slate-700/50">
    <div className="p-12 text-center">
      <div className="text-slate-400 mb-4">
        <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
      </div>
      <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">
        {searchTerm || filter !== "all" ? "No tasks found" : "No tasks yet"}
      </h3>
      <p className="text-slate-500 dark:text-slate-500">
        {searchTerm || filter !== "all"
          ? "Try adjusting your search or filter criteria"
          : "Add your first task to get started"}
      </p>
    </div>
  </div>
  )
}

export default EmptyState
