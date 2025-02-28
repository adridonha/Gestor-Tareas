// Rutas para manejar las tareas

const express = require('express');
const router = express.Router();
const { getTasks } = require('./taskController');

router.get('/tasks', getTasks);

module.exports = router;