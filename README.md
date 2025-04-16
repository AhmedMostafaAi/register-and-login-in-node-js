# Express & MongoDB API Server

A backend server built with **Express.js** and **MongoDB**, supporting user authentication, course management, and file uploads.

## Features
- **MongoDB Connection** via `mongoose`
- **CORS & JSON Middleware** setup
- **API Routes**:
  - `/api/courses` → Course management
  - `/api/users` → User operations
  - `/api/users/login` → Authentication
- **Static File Hosting** (`uploads` directory)
- **Global Error Handling** with custom error responses
- **Environment Variables** via `dotenv`
