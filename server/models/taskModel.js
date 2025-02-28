// Modelo para la base de datos (opcional)

const { Pool } = require('pg');
const pool = new Pool({
    user: 'dwec',
    host: 'localhost',
    database: 'dwec',
    password: 'dwec',
    port: 5432
});

const getTasks = async () => {
    const result = await pool.query('SELECT * FROM tasks');
    return result.rows;
};

module.exports = { getTasks };