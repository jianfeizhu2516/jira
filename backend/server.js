import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [
  {
    id: 1,
    task: 'Implement login functionality',
    description: 'Create login page and connect to backend',
    status: 'To Do',
    assignee: 'John Doe',
    dueDate: '2025-03-30',
  },
  {
    id: 2,
    task: 'Design dashboard UI',
    description: 'Create layout with charts and widgets',
    status: 'In Progress',
    assignee: 'Jane Smith',
    dueDate: '2025-04-05',
  },
];

let users = []; // Simple in-memory user store

// Register a new user
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  const exists = users.find(u => u.username === username);
  if (exists) {
    return res.status(409).json({ message: 'Username already taken' });
  }
  users.push({ username, password });
  res.status(201).json({ username });
});

// Login user
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  res.status(200).json({ username });
});

// GET all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// POST a new task
app.post('/api/tasks', (req, res) => {
  const task = { ...req.body, id: Date.now() };
  tasks.push(task);
  res.status(201).json(task);
});

// UPDATE a task
app.put('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  tasks = tasks.map(t => (t.id === id ? { ...req.body, id } : t));
  res.json({ success: true });
});

// DELETE a task
app.delete('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.json({ success: true });
});

app.listen(8800, () => {
  console.log(' Server running on http://localhost:8800');
});
