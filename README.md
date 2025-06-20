#  Task Management System Backend

*A robust RESTful API for task management built with Node.js, Express, and MongoDB*

[🚀 Getting Started](#-getting-started) • [📖 API Documentation](#-api-documentation) • [🛠️ Features](#️-features) • [🤝 Contributing](#-contributing)

---

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Configuration](#configuration)
- [Security Features](#security-features)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

<div align="center">

| 🎯 **Core Features** | 🛡️ **Security** | 🔧 **Developer Experience** |
|:---:|:---:|:---:|
| RESTful API Design | Environment Variables | Hot Reload with Nodemon |
| Full CRUD Operations | Input Validation | Clean Error Messages |
| MongoDB Integration | Custom Error Handling | Async/Await Pattern |
| Mongoose ODM | 404 Route Protection | Modular Architecture |

</div>

- ✅ **Complete CRUD Operations** - Create, Read, Update, Delete tasks
- 🔄 **RESTful API Design** - Following REST conventions
- 🍃 **MongoDB Integration** - Using Mongoose ODM for database operations
- 🛡️ **Error Handling** - Comprehensive error handling middleware
- 🎯 **Clean Architecture** - Separation of concerns with MVC pattern
- 🔧 **Development Ready** - Hot reload and development tools included

## 🏗️ Project Structure

```
backend/
├── 📁 controllers/          # Business logic layer
│   └── tasks.js            # Task-related operations
├── 📁 db/                  # Database configuration
│   └── connect.js          # MongoDB connection setup
├── 📁 middleware/          # Custom middleware functions
│   ├── async.js           # Async wrapper middleware
│   ├── custom-errors.js   # Custom error classes
│   ├── error-handler.js   # Global error handler
│   └── not-found.js       # 404 handler
├── 📁 models/             # Database models
│   └── tasks.js           # Task schema definition
├── 📁 routes/             # API routes
│   └── tasks.js           # Task endpoints
├── 📄 server.js           # Application entry point
└── 📄 package.json        # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- ![Node.js](https://img.shields.io/badge/Node.js-v14+-green) **Node.js** (v14 or higher)
- ![MongoDB](https://img.shields.io/badge/MongoDB-v4+-green) **MongoDB** (v4 or higher)
- ![npm](https://img.shields.io/badge/npm-v6+-red) **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/task-management-api.git
   cd task-management-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file:
   ```env
   # Database
   MONGO_URI=mongodb://localhost:27017/task-manager
   
   # Server
   PORT=5000
   NODE_ENV=development
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Verify installation**
   ```bash
   curl http://localhost:5000/api/v1/tasks
   ```

## 📖 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Endpoints Overview

| Method | Endpoint | Description | Status Code |
|:------:|:---------|:------------|:-----------:|
| ![GET](https://img.shields.io/badge/GET-blue) | `/tasks` | Get all tasks | `200` |
| ![POST](https://img.shields.io/badge/POST-green) | `/tasks` | Create new task | `201` |
| ![GET](https://img.shields.io/badge/GET-blue) | `/tasks/:id` | Get task by ID | `200` |
| ![PATCH](https://img.shields.io/badge/PATCH-orange) | `/tasks/:id` | Update task | `200` |
| ![DELETE](https://img.shields.io/badge/DELETE-red) | `/tasks/:id` | Delete task | `200` |

### 📋 Detailed API Reference

<details>
<summary><strong>📝 GET /api/v1/tasks</strong> - Retrieve all tasks</summary>

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "60d5ecb74b24c1a5d4f8e9b2",
      "name": "Complete project documentation",
      "completed": false,
      "createdAt": "2021-06-25T10:30:00.000Z",
      "updatedAt": "2021-06-25T10:30:00.000Z"
    }
  ],
  "count": 1
}
```
</details>

<details>
<summary><strong>➕ POST /api/v1/tasks</strong> - Create a new task</summary>

**Request Body:**
```json
{
  "name": "New task name",
  "completed": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ecb74b24c1a5d4f8e9b3",
    "name": "New task name",
    "completed": false,
    "createdAt": "2021-06-25T10:35:00.000Z",
    "updatedAt": "2021-06-25T10:35:00.000Z"
  }
}
```
</details>

<details>
<summary><strong>🔍 GET /api/v1/tasks/:id</strong> - Get task by ID</summary>

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ecb74b24c1a5d4f8e9b2",
    "name": "Complete project documentation",
    "completed": true,
    "createdAt": "2021-06-25T10:30:00.000Z",
    "updatedAt": "2021-06-25T12:00:00.000Z"
  }
}
```
</details>

<details>
<summary><strong>✏️ PATCH /api/v1/tasks/:id</strong> - Update task</summary>

**Request Body:**
```json
{
  "name": "Updated task name",
  "completed": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ecb74b24c1a5d4f8e9b2",
    "name": "Updated task name",
    "completed": true,
    "createdAt": "2021-06-25T10:30:00.000Z",
    "updatedAt": "2021-06-25T14:20:00.000Z"
  }
}
```
</details>

<details>
<summary><strong>🗑️ DELETE /api/v1/tasks/:id</strong> - Delete task</summary>

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ecb74b24c1a5d4f8e9b2",
    "name": "Deleted task",
    "completed": false,
    "createdAt": "2021-06-25T10:30:00.000Z",
    "updatedAt": "2021-06-25T10:30:00.000Z"
  },
  "message": "Task deleted successfully"
}
```
</details>

### Error Responses

```json
{
  "success": false,
  "error": {
    "message": "Task not found",
    "status": 404
  }
}
```

## 🔧 Configuration

### Dependencies

```json
{
  "dependencies": {
    "dotenv": "^8.2.0",      // Environment variables
    "express": "^4.17.1",    // Web framework
    "mongoose": "^5.11.10"   // MongoDB ODM
  },
  "devDependencies": {
    "nodemon": "^2.0.7"      // Development auto-reload
  }
}
```

### Environment Variables

| Variable | Description | Default | Required |
|:---------|:------------|:--------|:--------:|
| `MONGO_URI` | MongoDB connection string | - | ✅ |
| `PORT` | Server port | `5000` | ❌ |
| `NODE_ENV` | Environment mode | `development` | ❌ |

### Database Configuration

- **Database**: MongoDB with Mongoose ODM
- **Connection Options**: 
  - `useNewUrlParser: true`
  - `useUnifiedTopology: true`
- **Auto-reconnection**: Enabled
- **Connection pooling**: Default settings

## 🛡️ Security Features

<div align="center">

| 🔒 **Security Layer** | 📋 **Implementation** |
|:---:|:---:|
| Environment Variables | Sensitive data protection |
| Input Validation | Mongoose schema validation |
| Error Handling | No data leaks in responses |
| Custom Errors | Controlled error responses |

</div>

- 🔐 **Environment Variables** - Sensitive configuration protected
- ✅ **Input Validation** - Mongoose schema-based validation
- 🛡️ **Error Handling** - Comprehensive error middleware
- 🚫 **Data Sanitization** - MongoDB injection prevention

## 🧪 Testing

### Manual Testing with cURL

```bash
# Get all tasks
curl -X GET http://localhost:5000/api/v1/tasks

# Create a task
curl -X POST http://localhost:5000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -d '{"name": "Test task", "completed": false}'

# Update a task
curl -X PATCH http://localhost:5000/api/v1/tasks/TASK_ID \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

# Delete a task
curl -X DELETE http://localhost:5000/api/v1/tasks/TASK_ID
```

### Using Postman

Import the following collection for easy testing:

```json
{
  "info": {
    "name": "Task Management API",
    "description": "Collection for testing Task Management API endpoints"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:5000/api/v1"
    }
  ]
}
```

## 🤝 Contributing

I welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- ✅ Follow existing code style
- 🧪 Add tests for new features
- 📚 Update documentation
- 🔍 Ensure all tests pass

## 📈 Roadmap

- [ ] Add authentication & authorization
- [ ] Implement task categories
- [ ] Add due dates and reminders
- [ ] Create task sharing functionality
- [ ] Add file attachments
- [ ] Implement real-time updates

<div align="center">

**Built with ❤️ by [Sartaj Ashraf](https://github.com/Sartaj-Ashraf)**

⭐ Star this repository if you found it helpful!

[🔝 Back to Top](#-task-management-api)

</div>
