// Lógica para manejar las tareas (CRUD)

const Task = require('./../models/taskModel');

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.getTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getTasks };