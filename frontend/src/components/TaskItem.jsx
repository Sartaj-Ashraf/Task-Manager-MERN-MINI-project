import { CheckCircle2, Circle } from 'lucide-react'
import React from 'react'
import TaskDisplay from './TaskDisplay'
import TaskEditor from './TaskEditor'
import TaskActions from './TaskActions'

const TaskItem = ({ task, isEditing, onEdit, onSave, onCancel, onDelete, onToggleComplete }) => {
  return (
    <div
    className={`bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm shadow-lg rounded-lg border border-slate-200/50 dark:border-slate-700/50 transition-all duration-200 hover:shadow-xl ${
      task.completed ? "opacity-75" : ""
    }`}
  >
    <div className="p-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => onToggleComplete(task)}
          className={`flex-shrink-0 transition-colors duration-200 ${
            task.completed ? "text-green-600 hover:text-green-700" : "text-slate-400 hover:text-green-600"
          }`}
        >
          {task.completed ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <TaskEditor task={task} onSave={onSave} onCancel={onCancel} />
          ) : (
            <TaskDisplay 
              task={task} 
              onEdit={() => onEdit(task)} 
              onDelete={() => onDelete(task._id)} 
              onToggleComplete={() => onToggleComplete(task)} 
            />
          )}
        </div>

        {!isEditing && (
          <TaskActions 
            onEdit={() => onEdit(task)} 
            onDelete={() => onDelete(task._id)} 
          />
        )}
      </div>
    </div>
  </div>
  )
}

export default TaskItem
