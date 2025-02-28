const pool = require('../config/db'); // Importamos la conexión desde db.js

const getTasks = async () => {
    const result = await pool.query('SELECT * FROM tasks');
    return result.rows;
};

module.exports = { getTasks };
