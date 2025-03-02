"use strict";

/////////////////
//  FUNCTIONS  //
/////////////////

let currentEditingTaskId = null;
let allTasks = []; // Guardar todas las tareas globalmente

// Funcion para formatear fecha a DD-MM-YYYY
const formatDateDisplay = (dateString) => {
  // Si la fecha en la db es null, devolver string vacio
  if (dateString == null) {
    return '';
  }
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// Funcion para formatear a formato YYYY-MM-DD
const formatDate = (dateString) => {
  // Si no hay fecha, que el input este en blanco
  if (dateString == null) {
    return '';
  }
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Renderizar tareas en la tabla
const renderTasks = (tasksToRender) => {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = ''; // Borrar tareas existentes

  if (tasksToRender.length === 0) {
    const noTaskRow = document.createElement('tr');
    noTaskRow.innerHTML = `<td colspan="6">No existe esta tarea</td>`;
    taskList.appendChild(noTaskRow);
    return;
  }

  tasksToRender.forEach(task => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${task.task_id}</td>
      <td>${task.task_name}</td>
      <td>${task.task_description}</td>
      <td>${task.task_state}</td>
      <td>${formatDateDisplay(task.task_date)}</td>
      <td>
        <button class="edit-btn" onclick="openEditDialog(${task.task_id})">
          <i class="fas fa-edit"></i>
        </button>
        <button class="delete-btn" onclick="deleteTask(${task.task_id})">
          <i class="fas fa-trash-alt"></i>
        </button>
      </td>
    `;
    taskList.appendChild(row);
  });
};

// Buscar y filtrar tareas
const filterTasks = () => {
  const searchInput = document.getElementById('buscarTareas').value.toLowerCase();
  const stateFilter = document.getElementById('filtrarEstado').value;
  
  const filteredTasks = allTasks.filter(task => {
    const matchesSearch = task.task_name.toLowerCase().includes(searchInput);
    const matchesState = stateFilter === '' || task.task_state === stateFilter;
    
    return matchesSearch && matchesState;
  });
  
  renderTasks(filteredTasks);
};

// Mostrar las tareas
const fetchTasks = () => {
  fetch('http://localhost:3000/api/tasks')
    .then(response => response.json())
    .then(data => {
      allTasks = data; // Store all tasks
      renderTasks(data);
      
      // Add event listeners for search and filter
      const searchInput = document.getElementById('buscarTareas');
      const stateFilter = document.getElementById('filtrarEstado');
      
      searchInput.addEventListener('input', filterTasks);
      stateFilter.addEventListener('change', filterTasks);
    })
    .catch(error => console.error('Error mostrando las tareas:', error));
};



// Añadir nueva tarea
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
  .catch(error => console.error('Error añadiendo la tarea:', error));
};

// Abrir el dialog para editar una tarea
const openEditDialog = (taskId) => {
  currentEditingTaskId = taskId;
  fetch(`http://localhost:3000/api/tasks/${taskId}`)
    .then(response => response.json())
    .then(task => {
      if (!task) {
        console.error("Tarea no encontrada");
        return;
      }
      document.getElementById('edit-task-name').value = task.task_name || '';
      document.getElementById('edit-task-description').value = task.task_description || '';
      document.getElementById('edit-task-state').value = task.task_state || 'Pendiente';
      document.getElementById('edit-task-date').value = formatDate(task.task_date) || '';
      document.getElementById('edit-dialog').showModal();
    })
    .catch(error => console.error('Error recuperando la tarea:', error));
};

// Guardar tras editar
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
  .catch(error => console.error('Error guardando la tarea:', error));
};

// Borrar una tarea
const deleteTask = (taskId) => {
  fetch(`http://localhost:3000/api/tasks/${taskId}`, {
    method: 'DELETE'
  })
  .then(() => fetchTasks())
  .catch(error => console.error('Error borrando la tarea:', error));
};

// Cambio de tema
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
  const body = document.body;
  
  if (body.classList.contains('light-theme')) {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
  } else {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
  }
});

/////////////////
//   MAIN      //
/////////////////

document.getElementById('task-form').addEventListener('submit', addTask);
document.getElementById('save-task-btn').addEventListener('click', saveTask);
document.getElementById('cancel-edit-btn').addEventListener('click', () => {
  document.getElementById('edit-dialog').close();
});

fetchTasks();