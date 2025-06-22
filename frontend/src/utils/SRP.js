export const SRP = {
  DateUtils: {
    formatDate: (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },

  TaskUtils: {
    filterTasks: (tasks, filter) => {
      switch (filter) {
        case "active":
          return tasks.filter((task) => !task.completed);
        case "completed":
          return tasks.filter((task) => task.completed);
        default:
          return tasks;
      }
    },

    searchTasks: (tasks, searchTerm) => {
      if (!searchTerm) return tasks;
      return tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },

    getTaskStats: (tasks) => ({
      total: tasks.length,
      completed: tasks.filter((task) => task.completed).length,
      active: tasks.filter((task) => !task.completed).length,
    }),
  },
};
