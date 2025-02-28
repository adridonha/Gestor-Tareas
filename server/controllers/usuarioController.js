const UsuarioModel = require('../models/usuarioModel');

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await UsuarioModel.obtenerUsuarios();
    res.json(usuarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

module.exports = { obtenerUsuarios };
