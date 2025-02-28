-- Crear el usuario "dwec" con la contraseña "dwec"
CREATE ROLE dwec WITH LOGIN PASSWORD 'dwec';

-- Crear la base de datos "dwec" y asignarla al usuario "dwec"
CREATE DATABASE dwec OWNER dwec;

-- Conectarse a la base de datos "dwec"
\c dwec

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
    ('Revisar notas de clase', 'Repasar los apuntes de la última clase de programación.', 'iniciada', '2025-03-01'),
    ('Practicar algoritmos', 'Resolver al menos 3 ejercicios de algoritmos en LeetCode.', 'pendiente', '2025-03-02'),
    ('Configurar entorno de desarrollo', 'Instalar y configurar VS Code con las extensiones necesarias.', 'completada', '2025-02-27'),
    ('Leer documentación', 'Revisar la documentación oficial de PostgreSQL.', 'retrasada', '2025-03-03'),
    ('Hacer un mini proyecto', 'Desarrollar una pequeña aplicación CRUD en Python.', 'iniciada', '2025-03-05');
