import { useState } from "react";
// Components
import {
  Header,
  Footer,
  StatsGrid,
  TaskForm,
  SearchAndFilter,
  ErrorMessage,
  EmptyState,
  LoadingSpinner,
  TaskItem,
} from "./components";

// Hooks
import { useTaskManager } from "./hooks/useTaskManager";

// Utils
import { SRP } from "./utils/SRP";

/**
 * The main App component.
 *
 * This component renders the following:
 * - Header
 * - StatsGrid
 * - TaskForm
 * - SearchAndFilter
 * - A list of tasks (using the TaskItem component)
 * - An empty state message if no tasks are found
 * - A loading spinner if tasks are still loading
 * - A footer
 *
 * It also handles the following state:
 * - searchTerm: the search term entered by the user
 * - filter: the filter selected by the user
 * - editingTask: the ID of the task being edited
 *
 * And it provides the following functions:
 * - createTask: a function to create a new task
 * - updateTask: a function to update an existing task
 * - deleteTask: a function to delete a task
 * - handleToggleComplete: a function to toggle the completion status of a task
 * - handleEdit: a function to start editing a task
 * - handleSave: a function to save changes to a task
 * - handleCancel: a function to cancel editing a task
 */
export default function App() {
  const { tasks, loading, error, createTask, updateTask, deleteTask } =
    useTaskManager();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);

  // Apply filters and search
  const filteredTasks = SRP.TaskUtils.searchTasks(
    SRP.TaskUtils.filterTasks(tasks, filter),
    searchTerm
  );

  const stats = SRP.TaskUtils.getTaskStats(tasks);

  /**
   * Toggle the completion status of a task
   *
   * @param {Object} task The task to toggle
   */
  const handleToggleComplete = (task) => {
    updateTask(task._id, { completed: !task.completed });
  };

  /**
   * Start editing a task
   *
   * @param {Object} task The task to edit
   */
  const handleEdit = (task) => {
    setEditingTask(task._id);
  };

  /**
   * Save changes to a task
   *
   * @param {string} id The ID of the task to save
   * @param {Object} updates The updates to apply to the task
   */
  const handleSave = (id, updates) => {
    updateTask(id, updates);
    setEditingTask(null);
  };

  /**
   * Cancel editing a task
   */
  const handleCancel = () => {
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header />
        <StatsGrid stats={stats} />
        <TaskForm onSubmit={createTask} />
        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filter={filter}
          onFilterChange={setFilter}
        />

        {error && <ErrorMessage error={error} />}

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-4">
            {filteredTasks.length === 0 ? (
              <EmptyState searchTerm={searchTerm} filter={filter} />
            ) : (
              filteredTasks.map((task) => (
                <TaskItem
                  key={task._id}
                  task={task}
                  isEditing={editingTask === task._id}
                  onEdit={handleEdit}
                  onSave={handleSave}
                  onCancel={handleCancel}
                  onDelete={deleteTask}
                  onToggleComplete={handleToggleComplete}
                />
              ))
            )}
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}
