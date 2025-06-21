import { useState, useEffect } from "react"
import axios from "axios"
import { Plus, Search, CheckCircle2, Circle, Edit3, Trash2, Save, X, Calendar, Clock } from "lucide-react"

// Configure axios base URL - update this to match your backend
const API_BASE_URL = "http://localhost:5000/api/v1/tasks"

export default function App() {
  const [tasks, setTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  const [newTask, setNewTask] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [editingTask, setEditingTask] = useState(null)
  const [editTitle, setEditTitle] = useState("")

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true)
      const response = await axios.get(API_BASE_URL)
      console.log({response})
      setTasks(response.data)
      setError("")
    } catch (err) {
      setError("Failed to fetch tasks. Please check if your backend is running.")
      console.error("Error fetching tasks:", err)
    } finally {
      setLoading(false)
    }
  }

  // Create new task
  const createTask = async () => {
    if (!newTask.trim()) return

    try {
      const response = await axios.post(API_BASE_URL, {
        title: newTask.trim(),
      })
      setTasks([response.data, ...tasks])
      setNewTask("")
      setError("")
    } catch (err) {
      setError("Failed to create task")
      console.error("Error creating task:", err)
    }
  }

  // Update task
  const updateTask = async (id, updates) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/${id}`, updates)
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)))
      setError("")
    } catch (err) {
      setError("Failed to update task")
      console.error("Error updating task:", err)
    }
  }

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`)
      setTasks(tasks.filter((task) => task._id !== id))
      setError("")
    } catch (err) {
      setError("Failed to delete task")
      console.error("Error deleting task:", err)
    }
  }

  // Toggle task completion
  const toggleComplete = (task) => {
    updateTask(task._id, { completed: !task.completed })
  }

  // Start editing task
  const startEdit = (task) => {
    setEditingTask(task._id)
    setEditTitle(task.title)
  }

  // Save edited task
  const saveEdit = () => {
    if (!editTitle.trim()) return
    updateTask(editingTask, { title: editTitle.trim() })
    setEditingTask(null)
    setEditTitle("")
  }

  // Cancel editing
  const cancelEdit = () => {
    setEditingTask(null)
    setEditTitle("")
  }

  // Filter and search tasks
  useEffect(() => {
    let filtered = tasks

    // Apply filter
    if (filter === "active") {
      filtered = filtered.filter((task) => !task.completed)
    } else if (filter === "completed") {
      filtered = filtered.filter((task) => task.completed)
    }

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    setFilteredTasks(filtered)
  }, [tasks, filter, searchTerm])

  // Load tasks on component mount
  useEffect(() => {
    fetchTasks()
  }, [])

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Get task stats
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.completed).length
  const activeTasks = totalTasks - completedTasks

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-2">Task Manager</h1>
          <p className="text-slate-600 dark:text-slate-400">Stay organized and get things done</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm shadow-lg rounded-lg border border-slate-200/50 dark:border-slate-700/50">
            <div className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalTasks}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Total Tasks</div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm shadow-lg rounded-lg border border-slate-200/50 dark:border-slate-700/50">
            <div className="p-6 text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{activeTasks}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Active</div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm shadow-lg rounded-lg border border-slate-200/50 dark:border-slate-700/50">
            <div className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{completedTasks}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Completed</div>
            </div>
          </div>
        </div>

        {/* Add Task Form */}
        <div className="mb-8 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm shadow-lg rounded-lg border border-slate-200/50 dark:border-slate-700/50">
          <div className="p-6">
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Add a new task..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && createTask()}
                  className="w-full px-3 py-2 bg-white/50 dark:bg-slate-700/50 border-0 rounded-md focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-slate-100"
                />
              </div>
              <button
                onClick={createTask}
                disabled={!newTask.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-md font-medium transition-colors duration-200 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Task
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm shadow-lg rounded-lg border border-slate-200/50 dark:border-slate-700/50">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 px-3 py-2 bg-white/50 dark:bg-slate-700/50 border-0 rounded-md focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                    filter === "all" 
                      ? "bg-slate-800 text-white" 
                      : "bg-white/50 text-slate-700 border border-slate-200 hover:bg-white hover:shadow-sm"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("active")}
                  className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                    filter === "active" 
                      ? "bg-orange-600 text-white" 
                      : "bg-white/50 text-slate-700 border border-slate-200 hover:bg-white hover:shadow-sm"
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setFilter("completed")}
                  className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                    filter === "completed" 
                      ? "bg-green-600 text-white" 
                      : "bg-white/50 text-slate-700 border border-slate-200 hover:bg-white hover:shadow-sm"
                  }`}
                >
                  Completed
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="p-4">
              <p className="text-red-600 dark:text-red-400 text-center">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-slate-600 dark:text-slate-400">Loading tasks...</p>
          </div>
        ) : (
          /* Tasks List */
          <div className="space-y-4">
            {filteredTasks.length === 0 ? (
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
            ) : (
              filteredTasks.map((task) => (
                <div
                  key={task._id}
                  className={`bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm shadow-lg rounded-lg border border-slate-200/50 dark:border-slate-700/50 transition-all duration-200 hover:shadow-xl ${
                    task.completed ? "opacity-75" : ""
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4">
                      {/* Complete Toggle */}
                      <button
                        onClick={() => toggleComplete(task)}
                        className={`flex-shrink-0 transition-colors duration-200 ${
                          task.completed ? "text-green-600 hover:text-green-700" : "text-slate-400 hover:text-green-600"
                        }`}
                      >
                        {task.completed ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                      </button>

                      {/* Task Content */}
                      <div className="flex-1 min-w-0">
                        {editingTask === task._id ? (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") saveEdit()
                                if (e.key === "Escape") cancelEdit()
                              }}
                              className="flex-1 px-3 py-2 bg-white/50 dark:bg-slate-700/50 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100"
                              autoFocus
                            />
                            <button
                              onClick={saveEdit}
                              className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md transition-colors duration-200"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="bg-white/50 text-slate-700 border border-slate-200 hover:bg-white hover:shadow-sm px-3 py-2 rounded-md transition-colors duration-200"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
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
                                Created: {formatDate(task.createdAt)}
                              </div>
                              {task.updatedAt !== task.createdAt && (
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  Updated: {formatDate(task.updatedAt)}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      {editingTask !== task._id && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(task)}
                            className="bg-white/50 text-slate-700 border border-slate-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 px-3 py-2 rounded-md transition-colors duration-200"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteTask(task._id)}
                            className="bg-white/50 text-slate-700 border border-slate-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300 px-3 py-2 rounded-md transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-slate-500 dark:text-slate-400">
          <p>Built with React, Tailwind CSS, and Lucide Icons</p>
        </div>
      </div>
    </div>
  )
}