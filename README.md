# 🎓 Courses API – Node.js + MongoDB

This is a RESTful API built using **Express.js** and **MongoDB** for managing courses and users. It includes authentication, file uploads, and proper error handling.

## 🚀 Features

- 🔐 User registration & login
- 📚 CRUD operations for courses
- 📤 File uploads via `/uploads`
- 🧱 Modular architecture with controllers, models, routes, and middleware
- 🌐 CORS enabled
- ✅ Custom error handling
- ⚙️ Environment variables via `.env`

## 🗂️ Project Structure


- `routes/`: Route files like `courses.rout` and `user.rout`
- `models/`: Mongoose schemas for Courses & Users
- `utils/`: Error handling helpers (e.g., `appError.js`, `httpStatusTest.js`)
- `uploads/`: Public folder to serve uploaded files

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JSON Web Tokens (JWT)
- **Others**: dotenv, CORS

## 📦 Installation

Create a .env file and add:
MONGO_URL=your-mongo-uri
PORT=5001

```bash
npm install
npm run dev


