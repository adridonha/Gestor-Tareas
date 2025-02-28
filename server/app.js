const express = require('express');
const app = express();
const port = 3000;  // Puedes cambiar el puerto si lo deseas

// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Arrancar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
