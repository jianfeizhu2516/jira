const request = require('supertest');
const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];
let users = [];

app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ message: 'Username already taken' });
  }
  users.push({ username, password });
  res.status(201).json({ username });
});

app.post('/api/tasks', (req, res) => {
  const newTask = { ...req.body, id: Date.now() };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

describe('Backend API tests', () => {
  it('should register a new user successfully', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ username: 'testuser', password: 'testpass' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('username', 'testuser');
  });

  it('should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({
        task: 'Write unit tests',
        description: 'Use Jest to write API tests',
        status: 'To Do',
        assignee: 'testuser',
        dueDate: '2025-03-30',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('task', 'Write unit tests');
  });

  it('should fetch all tasks', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });
});
