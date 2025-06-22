import { Edit3, Trash2 } from 'lucide-react'
import React from 'react'

const TaskActions = ({ onEdit, onDelete }) => {
  return (
    <div className="flex gap-2">
    <button
      onClick={onEdit}
      className="bg-white/50 text-slate-700 border border-slate-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 px-3 py-2 rounded-md transition-colors duration-200"
    >
      <Edit3 className="w-4 h-4" />
    </button>
    <button
      onClick={onDelete}
      className="bg-white/50 text-slate-700 border border-slate-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300 px-3 py-2 rounded-md transition-colors duration-200"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  </div>
  )
}

export default TaskActions
