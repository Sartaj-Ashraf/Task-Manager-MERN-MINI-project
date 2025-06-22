import React from 'react'

import {SRP} from "../utils/SRP"

import { Calendar, Clock } from 'lucide-react'

const TaskDisplay = ({ task }) => {
  return (
    <div>
    <h3
      className={`text-lg font-medium ${
        task.completed
          ? "line-through text-slate-500 dark:text-slate-400"
          : "text-slate-800 dark:text-slate-200"
      }`}
    >
      {task.title}
    </h3>
    <div className="flex items-center gap-4 mt-2 text-sm text-slate-500 dark:text-slate-400">
      <div className="flex items-center gap-1">
        <Calendar className="w-3 h-3" />
        Created: {SRP.DateUtils.formatDate(task.createdAt)}
      </div>
      {task.updatedAt !== task.createdAt && (
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Updated: {SRP.DateUtils.formatDate(task.updatedAt)}
        </div>
      )}
    </div>
  </div>
  )
}

export default TaskDisplay
