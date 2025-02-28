const express = require('express');
const pool = require('./config/db.js'); // Importar la conexión a PostgreSQL
const usuarioRoutes = require('./routes/usuarioRoutes');
const app = express();
const port = 3000;  // Puedes cambiar el puerto si lo deseas

// Rutas
app.use('/api/usuarios', usuarioRoutes);

// Middleware para procesar JSON
app.use(express.json());

// Ruta para obtener datos desde PostgreSQL
app.get('/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios'); // Reemplaza con tu tabla
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});

// Arrancar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
