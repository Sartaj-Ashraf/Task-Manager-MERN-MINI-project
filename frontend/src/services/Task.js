import axios from "axios";

export class TaskService {
  constructor(baseUrl = "http://localhost:5000/api/v1") {
    this.baseUrl = baseUrl;
  }

  async fetchTasks() {
    const { data } = await axios.get(`${this.baseUrl}/tasks`);
    return data;
  }

  async createTask(title) {
    const { data } = await axios.post(`${this.baseUrl}/tasks`, { title });
    return data;
  }

  async updateTask(id, updates) {
    const { data } = await axios.patch(`${this.baseUrl}/tasks/${id}`, updates);
    return data;
  }

  async deleteTask(id) {
    await axios.delete(`${this.baseUrl}/tasks/${id}`);
  }
}



// export class TaskService {
//   constructor(baseUrl = "http://localhost:5000/api/v1") {
//     this.baseUrl = baseUrl;
//   }

//   async fetchTasks() {
//     const response = await fetch(`${this.baseUrl}/tasks`);
//     if (!response.ok) throw new Error("Failed to fetch tasks");
//     return response.json();
//   }

//   async createTask(title) {
//     const response = await fetch(`${this.baseUrl}/tasks`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ title }),
//     });
//     if (!response.ok) throw new Error("Failed to create task");
//     return response.json();
//   }

//   async updateTask(id, updates) {
//     const response = await fetch(`${this.baseUrl}/tasks/${id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(updates),
//     });
//     if (!response.ok) throw new Error("Failed to update task");
//     return response.json();
//   }

//   async deleteTask(id) {
//     const response = await fetch(`${this.baseUrl}/tasks/${id}`, {
//       method: "DELETE",
//     });
//     if (!response.ok) throw new Error("Failed to delete task");
//   }
// }
