// Lógica para manejar las tareas (CRUD)

const Task = require('./../models/taskModel');

// Devolver todas las tareas
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.getTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Devolver una tarea
const getTaskById = async (req, res) => {
    const { id } = req.params; // Get task ID from URL parameter
    try {
        const task = await Task.getTaskById(id); // Fetch task from the database
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task); // Send task data back to frontend
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear una nueva tarea
const createTask = async (req, res) => {
    const { task_name, task_description, task_state, task_date } = req.body;
    try {
        const newTask = await Task.createTask(task_name, task_description, task_state, task_date);
        res.status(201).json(newTask);  // Se manda la tarea
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una tarea
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { task_name, task_description, task_state, task_date } = req.body;
    try {
        const updatedTask = await Task.updateTask(id, task_name, task_description, task_state, task_date);
        if (updatedTask.rowCount === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Borrar una tarea
const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await Task.deleteTask(id);
        if (deletedTask.rowCount === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.status(200).json({ message: 'Tarea borrada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };