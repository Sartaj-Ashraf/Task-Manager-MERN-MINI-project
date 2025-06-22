import { useEffect, useState } from "react"
import {TaskService} from "../services/Task"

export const useTaskManager = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const taskService = new TaskService()

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const tasksData = await taskService.fetchTasks()
      setTasks(tasksData)
      setError("")
    } catch (err) {
      setError("Failed to fetch tasks. Please check if your backend is running.")
      console.error("Error fetching tasks:", err)
    } finally {
      setLoading(false)
    }
  }

  const createTask = async (title) => {
    if (!title.trim()) return
    try {
      const newTask = await taskService.createTask(title.trim())
      setTasks(prev => [newTask, ...prev])
      setError("")
    } catch (err) {
      setError("Failed to create task")
      console.error("Error creating task:", err)
    }
  }

  const updateTask = async (id, updates) => {
    try {
      const updatedTask = await taskService.updateTask(id, updates)
      setTasks(prev => prev.map(task => task._id === id ? updatedTask : task))
      setError("")
    } catch (err) {
      setError("Failed to update task")
      console.error("Error updating task:", err)
    }
  }

  const deleteTask = async (id) => {
    try {
      await taskService.deleteTask(id)
      setTasks(prev => prev.filter(task => task._id !== id))
      setError("")
    } catch (err) {
      setError("Failed to delete task")
      console.error("Error deleting task:", err)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask
  }
}