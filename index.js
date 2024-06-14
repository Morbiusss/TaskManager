// index.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Dummy database (in-memory)
let tasks = [
    { id: 1, title: 'Task 1', description: 'Description for Task 1', dueDate: '2024-06-15' },
    { id: 2, title: 'Task 2', description: 'Description for Task 2', dueDate: '2024-06-16' }
];
let nextTaskId = 3;

// Routes
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id === taskId);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
});

app.post('/tasks', (req, res) => {
    const newTask = {
        id: nextTaskId++,
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    let taskToUpdate = tasks.find(task => task.id === taskId);
    if (!taskToUpdate) {
        return res.status(404).json({ message: 'Task not found' });
    }
    taskToUpdate.title = req.body.title;
    taskToUpdate.description = req.body.description;
    taskToUpdate.dueDate = req.body.dueDate;
    res.json(taskToUpdate);
});

app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId);
    res.status(204).end();
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
