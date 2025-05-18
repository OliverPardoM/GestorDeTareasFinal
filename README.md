# 📝 Gestor de Tareas

Aplicación completa para la gestión de tareas personales con autenticación de usuarios. Incluye un backend en Node.js y un frontend en React.

## 📁 Estructura del Proyecto

GestorTareasFinal/

1) backend-gestor/ # API REST con Node.js, Express, Sequelize y JWT

2) frontend-gestor/ # Aplicación web en React con TailwindCSS

## 🚀 Instalación

### 🔧 Backend

1. Ir a la carpeta del backend:
   cd backend-gestor
   
Instalar dependencias:

  npm install
  
Crear un archivo .env con tus variables:
PORT=3000
JWT_SECRET=tu_secreto

Editar el archivo /config/config.json con las credenciales de su BBBDD Postgres

Ejecutar migraciones:

  npx sequelize db:migrate

Iniciar el servidor:

  npm start

🌐 Frontend
Ir a la carpeta del frontend:

  cd frontend-gestor

Instalar dependencias:

  npm install

Iniciar la aplicación:

  npm start

✅ Funcionalidades
Registro e inicio de sesión con JWT
Creación, edición y eliminación de tareas
Marcar tareas como completadas
Filtrado y búsqueda de tareas
Interfaz moderna con React + Tailwind

👨‍💻 Autor
Oliver Pardo Maydana

Repositorio: https://github.com/OliverPardoM/GestorTareasFinal
