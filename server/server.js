const express = require('express');
const pool = require('./config/db.js'); // Importar la conexión a PostgreSQL
const taskRoutes = require('./routes/taskRoutes');
const validateTask = require('./middlewares/validateTask'); // El middleware de validacion
const path = require('path'); // Necesario para trabajar con rutas de archivos
const app = express();
const port = 3000;  // Puedes cambiar el puerto si lo deseas

// Middleware para procesar JSON
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'src/public'
app.use(express.static(path.join(__dirname, '../src/public')));

// Ruta para obtener datos desde PostgreSQL
app.use('/api/tasks', taskRoutes);

// Arrancar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
