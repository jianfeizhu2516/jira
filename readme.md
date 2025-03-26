# Task Management App

A simple full-stack task management application built with React (Vite) and Node.js/Express. It allows user registration, login, task filtering, search, creation, editing, and deletion.

---

## Project Structure

```
project-root/
├── front/        # React + Vite frontend
└── backend/         # Express backend
```

---

## ✅ Backend Setup

### Prerequisites
- Node.js (version 16 or higher)

### Steps
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm start
   ```

4. The server runs on:
   ```
http://localhost:8800
```

---

##  Frontend Setup

### Prerequisites
- Node.js (version 16 or higher)

### Steps
1. Navigate to the front folder:
   ```bash
   cd front
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite dev server:
   ```bash
   npm run dev
   ```

4. The app will be available at:
   ```
http://localhost:5173
```

### Vite Proxy
The Vite dev server proxies API requests to the backend. Ensure this config exists in `frontend/vite.config.js`:

```js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8800',
      changeOrigin: true,
    },
  },
}
```

---

##  User Info
- Users can **Sign Up**, **Log In**, or use **Continue as Guest**.
- Logged-in user's name is shown in the header.
- Guest users will see "Guest" in the header.

---

##  Running Backend Tests (Jest)

### Install Dev Dependencies:
```bash
cd backend
npm install --save-dev jest supertest
```

### Add test script to `package.json`:
```json
"scripts": {
  "test": "jest"
}
```

### Create test file:
Place test file at `backend/tests/server.test.js`. It includes tests for:
- User registration
- Task creation
- Fetching tasks

### Run tests:
```bash
npm test
```

