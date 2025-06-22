import { Plus } from 'lucide-react'
import React, { useState } from 'react'

const TaskForm = ({onSubmit}) => {
  const [newTask, setNewTask] = useState("")

  const handleSubmit = () => {
    onSubmit(newTask)
    setNewTask("")
  }

  return (
    <div className="mb-8 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm shadow-lg rounded-lg border border-slate-200/50 dark:border-slate-700/50">
      <div className="p-6">
        <div className="flex gap-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Add a new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full px-3 py-2 bg-white/50 dark:bg-slate-700/50 border-0 rounded-md focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-slate-100"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={!newTask.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-md font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Task
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskForm
