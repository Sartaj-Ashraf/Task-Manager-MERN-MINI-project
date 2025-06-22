import { Save, X } from 'lucide-react'
import React, { useState } from 'react'

const TaskEditor = ({ task, onSave, onCancel }) => {
    const [editTitle, setEditTitle] = useState(task.title)

    const handleSave = () => {
      if (editTitle.trim()) {
        onSave(task._id, { title: editTitle.trim() })
      }
    }
  
    return (
      <div className="flex gap-2">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave()
            if (e.key === "Escape") onCancel()
          }}
          className="flex-1 px-3 py-2 bg-white/50 dark:bg-slate-700/50 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100"
          autoFocus
        />
        <button
          onClick={handleSave}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md transition-colors duration-200"
        >
          <Save className="w-4 h-4" />
        </button>
        <button
          onClick={onCancel}
          className="bg-white/50 text-slate-700 border border-slate-200 hover:bg-white hover:shadow-sm px-3 py-2 rounded-md transition-colors duration-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    )
  }

export default TaskEditor
