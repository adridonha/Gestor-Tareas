-- Crear el usuario "dwec" con la contraseña "dwec"
CREATE ROLE dwec WITH LOGIN PASSWORD 'dwec';

-- Crear la base de datos "dwec" y asignarla al usuario "dwec"
CREATE DATABASE dwec OWNER dwec;

-- Conectarse a la base de datos "dwec"
\c dwec

---------------------------------------------
-- METODO ALTERNATIVO
-- Crear usuario
-- CREATE USER dwec WITH PASSWORD 'dwec';
    
-- Crear base de datos
-- CREATE DATABASE dwec;
    
-- Cambiar a la base de datos dwec
-- \c dwec
    
-- Dar permisos en la base de datos
-- GRANT ALL PRIVILEGES ON DATABASE dwec TO dwec;
    
-- Dar permisos en esquema public
-- GRANT ALL ON SCHEMA public TO dwec;
---------------------------------------------

-- Cambiar codificacion a UTF8 para asegurarnos de que los registros admitan español
SET client_encoding TO 'UTF8';
    
-- Crear la tabla "tasks" para la lista de tareas
CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    task_name VARCHAR(255) NOT NULL,
    task_description TEXT,
    task_state VARCHAR(50) NOT NULL,
    task_date DATE
);

-- Insertar 5 tareas aleatorias relacionadas con el día a día de un programador estudiante
INSERT INTO tasks (task_name, task_description, task_state, task_date) VALUES
    ('Revisar notas de clase', 'Repasar los apuntes de la última clase de programación.', 'Iniciada', '2025-03-01'),
    ('Practicar algoritmos', 'Resolver al menos 3 ejercicios de algoritmos en LeetCode.', 'Pendiente', '2025-03-02'),
    ('Configurar entorno de desarrollo', 'Instalar y configurar VS Code con las extensiones necesarias.', 'Completada', '2025-02-27'),
    ('Leer documentación', 'Revisar la documentación oficial de PostgreSQL.', 'Retrasada', '2025-03-03'),
    ('Hacer un mini proyecto', 'Desarrollar una pequeña aplicación CRUD en Python.', 'Iniciada', '2025-03-05');
