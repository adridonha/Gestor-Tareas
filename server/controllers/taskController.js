// Lógica para manejar las tareas (CRUD)

const Task = require('./taskModel');

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.getTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};