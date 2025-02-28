const pool = require('../config/db');

class UsuarioModel {
  static async obtenerUsuarios() {
    const result = await pool.query('SELECT * FROM usuarios');
    return result.rows;
  }
}

module.exports = UsuarioModel;
