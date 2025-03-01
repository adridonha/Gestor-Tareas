"use strict";

/////////////////
//  FUNCTIONS  //
/////////////////

let currentEditingTaskId = null;

// Function to format the date as DD-MM-YYYY
const formatDateDisplay = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

// Function to format date from YYYY-MM-DD format
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

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
                    <td>${formatDateDisplay(task.task_date)}</td>
                    <td>
                        <button onclick="openEditDialog(${task.task_id})">Edit</button>
                        <button onclick="deleteTask(${task.task_id})">Delete</button>
                    </td>
                `;
                taskList.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching tasks:', error));
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
        fetchTasks();
        document.getElementById('task-form').reset();
    })
    .catch(error => console.error('Error adding task:', error));
};

// Open the Edit Task dialog
const openEditDialog = (taskId) => {
    currentEditingTaskId = taskId;
    fetch(`http://localhost:3000/api/tasks/${taskId}`)
        .then(response => response.json())
        .then(task => {
            if (!task) {
                console.error("Task not found");
                return;
            }
            document.getElementById('edit-task-name').value = task.task_name || '';
            document.getElementById('edit-task-description').value = task.task_description || '';
            document.getElementById('edit-task-state').value = task.task_state || 'Pendiente';
            document.getElementById('edit-task-date').value = formatDate(task.task_date) || '';
            document.getElementById('edit-dialog').showModal();
        })
        .catch(error => console.error('Error fetching task for editing:', error));
};

// Save the task after editing
const saveTask = () => {
    const task_name = document.getElementById('edit-task-name').value;
    const task_description = document.getElementById('edit-task-description').value;
    const task_state = document.getElementById('edit-task-state').value;
    const task_date = document.getElementById('edit-task-date').value;
    
    fetch(`http://localhost:3000/api/tasks/${currentEditingTaskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task_name, task_description, task_state, task_date })
    })
    .then(response => response.json())
    .then(() => {
        fetchTasks();
        document.getElementById('edit-dialog').close();
    })
    .catch(error => console.error('Error saving task:', error));
};

// Delete a task
const deleteTask = (taskId) => {
    fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: 'DELETE'
    })
    .then(() => fetchTasks())
    .catch(error => console.error('Error deleting task:', error));
};

/////////////////
//   MAIN      //
/////////////////

document.getElementById('task-form').addEventListener('submit', addTask);
document.getElementById('save-task-btn').addEventListener('click', saveTask);
document.getElementById('cancel-edit-btn').addEventListener('click', () => {
document.getElementById('edit-dialog').close();
});

fetchTasks();