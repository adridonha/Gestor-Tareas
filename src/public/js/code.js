"use strict";

/////////////////
//  FUNCTIONS  //
/////////////////

let currentEditingTaskId = null;
let allTasks = []; 

// Funcion para formatear fecha a DD-MM-YYYY
const formatDateDisplay = (dateString) => {
  // Check if dateString is empty or undefined
  if (!dateString) {
    return "Sin fecha de entrega";
  }

  const date = new Date(dateString);
  
  // Check if date is invalid
  if (isNaN(date.getTime())) {
    return "Sin fecha de entrega";
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// Funcion para formatear a formato YYYY-MM-DD
const formatDate = (dateString) => {
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
  taskList.innerHTML = ''; 

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

//Menu hambugersa
// const menuToggle = document.getElementById('menu-toggle');
// const navLinks = document.querySelector('.nav-links');

// menuToggle.addEventListener('click', () => {
//     navLinks.classList.toggle('active');
//     menuToggle.classList.toggle('active');
// });

// document.addEventListener('click', (e) => {
//     if (!menuToggle.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
//         navLinks.classList.remove('active');
//         menuToggle.classList.remove('active');
//     }
// });

// Buscar y filtrar tareas
const filterTasks = () => {
  const searchInput = document.getElementById('buscarTareas').value.toLowerCase();
  const stateFilter = document.getElementById('filtrarEstado').value;
  const dateSortOption = document.getElementById('ordenarFecha').value;
  
  let filteredTasks = allTasks.filter(task => {
    const matchesSearch = task.task_name.toLowerCase().includes(searchInput);
    const matchesState = stateFilter === '' || task.task_state === stateFilter;
    
    return matchesSearch && matchesState;
  });
  
  // Ordenar por fecha 
  if (dateSortOption === 'reciente') {
    filteredTasks.sort((a, b) => new Date(b.task_date) - new Date(a.task_date));
  } else if (dateSortOption === 'antigua') {
    filteredTasks.sort((a, b) => new Date(a.task_date) - new Date(b.task_date));
  }
  
  renderTasks(filteredTasks);
};

// Mostrar las tareas
const fetchTasks = () => {
  fetch('http://localhost:3000/api/tasks')
    .then(response => response.json())
    .then(data => {
      allTasks = data; // Store all tasks
      renderTasks(data);
      
      // Add event listeners for search, filter, and date sorting
      const searchInput = document.getElementById('buscarTareas');
      const stateFilter = document.getElementById('filtrarEstado');
      const dateSort = document.getElementById('ordenarFecha');
      
      searchInput.addEventListener('input', filterTasks);
      stateFilter.addEventListener('change', filterTasks);
      dateSort.addEventListener('change', filterTasks);
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
    Swal.fire({
      title: "Tarea añadida correctamente",
      icon: "success",
      draggable: true
    });
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
  const task_name = document.getElementById('edit-task-name').value.trim();
  const task_description = document.getElementById('edit-task-description').value;
  const task_state = document.getElementById('edit-task-state').value;
  const task_date = document.getElementById('edit-task-date').value;
  
  // Validate task name
  if (!task_name) {
    document.getElementById('edit-dialog').close(); // Close the edit dialog
    Swal.fire({
      title: "Error",
      text: "El nombre de la tarea no puede estar vacío",
      icon: "error",
      draggable: true
    });
    return;
  }
  
  fetch(`http://localhost:3000/api/tasks/${currentEditingTaskId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task_name, task_description, task_state, task_date })
  })
  .then(response => response.json())
  .then(() => {
    fetchTasks();
    document.getElementById('edit-dialog').close();
    Swal.fire({
      title: "Tarea editada correctamente",
      icon: "success",
      draggable: true
    });
  })
  .catch(error => console.error('Error al guardar tarea:', error));
};

// Borrar una tarea
const deleteTask = (taskId) => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "¡No podrás revertir este cambio!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Eliminar!"
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: 'DELETE'
      })
      .then(() => {
        fetchTasks();
        Swal.fire({
          title: "¡Borrada!",
          text: "Tu tarea ha sido eliminada.",
          icon: "success"
        });
      })
      .catch(error => console.error('Error borrando la tarea:', error));
    }
  });
};

// Modo claro/oscuro
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
  // Guardar el tema en localstorage
  let theme = document.body.className;
  localStorage.setItem('theme', theme);
});

// Cargar tema desde localstorage
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    // Si existe se aplica
    document.body.className = savedTheme;
  }
  // Por defecto ya esta el light-theme
}

/////////////////
//   MAIN      //
/////////////////

// Cargar el tema
loadTheme();

document.getElementById('task-form').addEventListener('submit', addTask);
document.getElementById('save-task-btn').addEventListener('click', saveTask);
document.getElementById('cancel-edit-btn').addEventListener('click', () => {
  document.getElementById('edit-dialog').close();
});

fetchTasks();