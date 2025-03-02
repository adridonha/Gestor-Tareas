const pool = require('../config/db'); // Importamos la conexión desde db.js

// Todas las tareas
const getTasks = async () => {
    const result = await pool.query('SELECT task_id, task_name, task_description, task_state, task_date::date AS task_date FROM tasks ORDER BY task_id');
    return result.rows;
};
// Una sola tarea
const getTaskById = async (id) => {
    const result = await pool.query('SELECT task_id, task_name, task_description, task_state, task_date::date AS task_date FROM tasks WHERE task_id = $1', [id]);
    return result.rows[0]; // Return the task or null if not found
};

// Crear nueva tarea
const createTask = async (task_name, task_description, task_state, task_date) => {
    const result = await pool.query(
        'INSERT INTO tasks (task_name, task_description, task_state, task_date) VALUES ($1, $2, $3, $4) RETURNING *',
        [task_name, task_description, task_state, task_date]
    );
    return result.rows[0];
};

// Actualizar una tarea
const updateTask = async (task_id, task_name, task_description, task_state, task_date) => {
    const result = await pool.query(
        'UPDATE tasks SET task_name = $1, task_description = $2, task_state = $3, task_date = $4 WHERE task_id = $5 RETURNING *',
        [task_name, task_description, task_state, task_date, task_id]
    );
    return result;
};

// Borrar una tarea
const deleteTask = async (task_id) => {
    const result = await pool.query('DELETE FROM tasks WHERE task_id = $1 RETURNING *', [task_id]);
    return result;
};

module.exports = { getTasks, createTask, updateTask, deleteTask, getTaskById };
