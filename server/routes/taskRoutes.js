// Rutas para manejar las tareas

const express = require('express');
const router = express.Router();
const { getTasks, getTaskById, createTask, updateTask, deleteTask } = require('./../controllers/taskController');

// Devolver todas las tareas
router.get('/', getTasks);
// Devolver una tarea
router.get('/:id', getTaskById);
// Crear una nueva tarea
router.post('/', createTask);
// Actualizar una tarea
router.put('/:id', updateTask);
// Borrar una tarea
router.delete('/:id', deleteTask);

module.exports = router;