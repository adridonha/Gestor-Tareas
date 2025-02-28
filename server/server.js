const express = require('express');
const pool = require('./config/db.js'); // Importar la conexión a PostgreSQL
const usuarioRoutes = require('./routes/usuarioRoutes');
const taskRoutes = require('./routes/taskRoutes');
const app = express();
const port = 3000;  // Puedes cambiar el puerto si lo deseas

// Middleware para procesar JSON
app.use(express.json());

// Ruta para obtener datos desde PostgreSQL
app.use('/api/tasks', taskRoutes);
app.use('/api/usuarios', usuarioRoutes);

// Arrancar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
