// Middleware para validar las tareas
function validateTask(req, res, next) {
  let { task_name, task_description, task_state, task_date } = req.body;

  // Validacion de nombre no vacio
  if (!task_name || task_name === '') {
    return res.status(400).json({ error: 'El nombre no puede estar vacío' });
  }

  // Manejar fechas vacias como nulas en la base de datos
  if (task_date == '') {
    task_date = null;
  }

  // Manejar estado vacio o diferente a los definidos
  // Esto nos permite cambiarlos mas facilmente
  const states = ['Pendiente','Iniciada','Completada','Retrasada'];
  if (!states.includes(task_state)) {
    return res.status(400).json({ error: 'El estado solo puede ser: Pendiente, Iniciada, Completada o Retrasada' });
  }

  // Modificar los valores en la peticion
  req.body.task_name = task_name;
  req.body.task_description = task_description;
  req.body.task_state = task_state;
  req.body.task_date = task_date;

  // Si la validacion es correcta se sigue en el router
  next();
}

module.exports = validateTask;
