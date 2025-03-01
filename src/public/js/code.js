"use strict";

/////////////////
//  FUNCTIONS  //
/////////////////

// Fetch tasks and display them
const fetchTasks = () => {
    fetch('http://localhost:3000/api/tasks')
        .then(response => response.json())
        .then(data => {
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = '';
            data.forEach(task => {
                const row = document.createElement('tr');                        
                row.innerHTML = `
                    <td>${task.task_id}</td>
                    <td>${task.task_name}</td>
                    <td>${task.task_description}</td>
                    <td>${task.task_state}</td>
                    <td>${task.task_date}</td>
                    <td>
                        <button onclick="editTask(${task.task_id})">Editar</button>
                        <button onclick="deleteTask(${task.task_id})">Borrar</button>
                    </td>
                `;
                taskList.appendChild(row);
            });
        })
        .catch(error => console.error('Error al mostrar las tareas:', error));
};

// Add a new task
const addTask = (event) => {
    event.preventDefault();
    const task_name = document.getElementById('task-name').value;
    const task_description = document.getElementById('task-description').value;
    const task_state = document.getElementById('task-state').value;
    const task_date = document.getElementById('task-date').value;

    fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task_name, task_description, task_state, task_date })
    })
    .then(response => response.json())
    .then(() => {
        fetchTasks(); // Recargar tareas
        document.getElementById('task-form').reset();
    })
    .catch(error => console.error('Error al añadir la tarea:', error));
};

// Edit a task
const editTask = (taskId) => {
    const task_name = prompt('Editar nombre');
    const task_description = prompt('Editar descripcion');
    const task_state = prompt('Editar estado (iniciada, pendiente, completada, retrasada)');
    const task_date = prompt('Editar fecha (yyyy-mm-dd)');

    if (task_name && task_description && task_state && task_date) {
        fetch(`http://localhost:3000/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task_name, task_description, task_state, task_date })
        })
        .then(response => response.json())
        .then(() => fetchTasks())  // Reload tasks
        .catch(error => console.error('Error editando la tarea:', error));
    }
};

// Delete a task
const deleteTask = (taskId) => {
    fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: 'DELETE'
    })
    .then(() => fetchTasks())  // Reload tasks
    .catch(error => console.error('Error borrando la tarea:', error));
};

/////////////////
//   MAIN      //
/////////////////

// Initialize the page
document.getElementById('task-form').addEventListener('submit', addTask);
fetchTasks();
