# Backend - To-Do App

[English Version](#english-version) | [Versión en Español](#versión-en-español)

---

## 🇬🇧 English Version

A RESTful API backend for a To-Do application built with Node.js, Express, and MySQL. This application allows users to create accounts, authenticate, and manage their personal tasks.

## 📋 Features

- **User Authentication**
  - User registration with email validation
  - Secure login with JWT token generation
  - Password encryption using bcrypt
  
- **Task Management**
  - Create new tasks
  - View all tasks for authenticated users
  - Update task completion status
  - Delete tasks

- **Security**
  - JWT-based authentication
  - Protected routes with middleware
  - Password hashing
  - Input validation with Joi

## 🛠️ Technologies

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL with Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: Joi
- **Testing**: Jest & Supertest
- **Development**: Nodemon, Morgan (logging)

## � Technical Decisions

The technology stack and project architecture were chosen based on familiarity and proven reliability:

- **Node.js & Express.js**: Selected due to prior experience with these technologies, which allows for faster development and easier maintenance.

- **Project Structure**: The MVC-inspired architecture (controllers, models, routes, middleware) was chosen due to prior experience with it.

- **Libraries & Tools**: 
  - **Sequelize ORM**: Simplifies database operations and provides easy migration management
  - **JWT for Authentication**: Industry-standard for stateless authentication in REST APIs
  - **Joi for Validation**: Provides robust schema validation with clear error messages
  - **Jest & Supertest**: Comprehensive testing tools that work seamlessly with Node.js

### Code Language
All code, including comments, variable names, function names, and documentation within the code, is written in **English**. This decision was made because:
- It's how I was taught at university
- English is the industry standard for programming
- It ensures better collaboration and code readability for international teams
- It aligns with best practices in software development

## �📁 Project Structure

```
Backend-Prueba-Tecnica-To-Do-App/
├── src/
│   ├── controllers/
│   │   ├── auth.controllers.js    # Authentication logic
│   │   └── task.controllers.js    # Task CRUD operations
│   ├── middleware/
│   │   ├── authentication.handler.js  # JWT verification
│   │   └── validation.handler.js      # Request validation
│   ├── models/
│   │   ├── user.model.js          # User model
│   │   ├── task.model.js          # Task model
│   │   └── asociations.js         # Model relationships
│   ├── routes/
│   │   ├── auth.router.js         # Auth endpoints
│   │   ├── task.router.js         # Task endpoints
│   │   └── routes.js              # Route aggregator
│   └── dot/
│       └── validator.js           # Joi schemas
├── tests/
│   └── index.test.js              # API tests
├── database.js                    # Database connection
├── server.js                      # Express app setup
├── index.js                       # Entry point
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/iverrr78/Backend-Prueba-Tecnica-To-Do-App.git
   cd Backend-Prueba-Tecnica-To-Do-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=3001
   DB_HOST=localhost
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=todo_app
   DB_PORT=3306
   JWT_SECRET=your_super_secret_jwt_key
   ```

4. **Create the database**
   ```sql
   CREATE DATABASE todo_app;
   ```

5. **Start the server**
   
   Development mode (with auto-restart):
   ```bash
   npm run dev
   ```
   
   Production mode:
   ```bash
   npm start
   ```

The server will start on `http://localhost:3001`

## 📚 API Documentation

### Authentication Endpoints

#### Register a new user
```http
POST /auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201)**
```json
{
  "message": "User successfully registered.",
  "user": {
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200)**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

### Task Endpoints

> **Note:** All task endpoints require authentication. Include the JWT token in the Authorization header:
> ```
> Authorization: Bearer <your_token>
> ```

#### Get all tasks
```http
GET /task
Authorization: Bearer <token>
```

**Response (200)**
```json
{
  "message": "Tasks retrieved successfully",
  "tasks": [
    {
      "id": 1,
      "title": "Complete project",
      "description": "Finish the To-Do app",
      "completed": false,
      "userId": 1
    }
  ]
}
```

#### Create a new task
```http
POST /task/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

**Response (201)**
```json
{
  "message": "Task created successfully",
  "task": {
    "id": 2,
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "completed": false,
    "userId": 1
  }
}
```

#### Update a task (mark as completed)
```http
PATCH /task/update/:id
Authorization: Bearer <token>
```

**Response (200)**
```json
{
  "message": "Task updated successfully"
}
```

#### Delete a task
```http
DELETE /task/delete/:id
Authorization: Bearer <token>
```

**Response (200)**
```json
{
  "message": "Task deleted successfully"
}
```

## 🧪 Testing

Run tests with:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Generate coverage report:
```bash
npm run test:coverage
```

## 🗄️ Database Schema

### Users Table
| Column    | Type         | Constraints           |
|-----------|--------------|----------------------|
| id        | INTEGER      | PRIMARY KEY, AUTO_INCREMENT |
| username  | VARCHAR(255) | NOT NULL             |
| email     | VARCHAR(255) | UNIQUE, NOT NULL     |
| password  | VARCHAR(255) | NOT NULL (hashed)    |
| createdAt | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP |
| updatedAt | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP |

### Tasks Table
| Column      | Type         | Constraints           |
|-------------|--------------|----------------------|
| id          | INTEGER      | PRIMARY KEY, AUTO_INCREMENT |
| title       | VARCHAR(255) | NOT NULL             |
| description | TEXT         |                      |
| completed   | BOOLEAN      | DEFAULT false        |
| userId      | INTEGER      | FOREIGN KEY (Users.id) |
| createdAt   | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP |
| updatedAt   | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP |

## 🔒 Security

- Passwords are hashed using bcryptjs with salt rounds
- JWT tokens expire after 1 hour
- Protected routes require valid JWT authentication
- Input validation on all endpoints using Joi schemas
- CORS enabled for cross-origin requests

## 📝 License

MIT

## 👤 Author

[iverrr78](https://github.com/iverrr78)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## Versión en Español

Una API RESTful backend para una aplicación de tareas (To-Do) construida con Node.js, Express y MySQL. Esta aplicación permite a los usuarios crear cuentas, autenticarse y gestionar sus tareas personales.

## 📋 Características

- **Autenticación de Usuarios**
  - Registro de usuarios con validación de email
  - Inicio de sesión seguro con generación de tokens JWT
  - Encriptación de contraseñas usando bcrypt
  
- **Gestión de Tareas**
  - Crear nuevas tareas
  - Ver todas las tareas del usuario autenticado
  - Actualizar el estado de completado de las tareas
  - Eliminar tareas

- **Seguridad**
  - Autenticación basada en JWT
  - Rutas protegidas con middleware
  - Hashing de contraseñas
  - Validación de entrada con Joi

## 🛠️ Tecnologías

- **Runtime**: Node.js
- **Framework**: Express.js
- **Base de Datos**: MySQL con Sequelize ORM
- **Autenticación**: JWT (JSON Web Tokens)
- **Hash de Contraseñas**: bcryptjs
- **Validación**: Joi
- **Testing**: Jest & Supertest
- **Desarrollo**: Nodemon, Morgan (logging)

## � Decisiones Técnicas

El stack tecnológico y la arquitectura del proyecto fueron elegidos basándose en la familiaridad y confiabilidad probada:

- **Node.js & Express.js**: Seleccionados debido a la experiencia previa con estas tecnologías, lo que permite un desarrollo más rápido y un mantenimiento más sencillo.

- **Estructura del Proyecto**: La arquitectura inspirada en MVC (controladores, modelos, rutas, middleware) fue elegida tambien debido a experiencia previa con esta.

- **Librerías y Herramientas**:
  - **Sequelize ORM**: Simplifica las operaciones de base de datos y proporciona gestión fácil de migraciones
  - **JWT para Autenticación**: Estándar de la industria para autenticación sin estado en APIs REST
  - **Joi para Validación**: Proporciona validación de esquemas robusta con mensajes de error claros
  - **Jest & Supertest**: Herramientas de testing completas que funcionan perfectamente con Node.js

### Idioma del Código
Todo el código, incluyendo comentarios, nombres de variables, nombres de funciones y documentación dentro del código, está escrito en **inglés**. Esta decisión se tomó porque:
- Es como me enseñaron en la universidad
- El inglés es el estándar de la industria para programación
- Asegura mejor colaboración y legibilidad del código para equipos internacionales
- Se alinea con las mejores prácticas en desarrollo de software

## �📁 Estructura del Proyecto

```
Backend-Prueba-Tecnica-To-Do-App/
├── src/
│   ├── controllers/
│   │   ├── auth.controllers.js    # Lógica de autenticación
│   │   └── task.controllers.js    # Operaciones CRUD de tareas
│   ├── middleware/
│   │   ├── authentication.handler.js  # Verificación JWT
│   │   └── validation.handler.js      # Validación de requests
│   ├── models/
│   │   ├── user.model.js          # Modelo de Usuario
│   │   ├── task.model.js          # Modelo de Tarea
│   │   └── asociations.js         # Relaciones entre modelos
│   ├── routes/
│   │   ├── auth.router.js         # Endpoints de autenticación
│   │   ├── task.router.js         # Endpoints de tareas
│   │   └── routes.js              # Agregador de rutas
│   └── dot/
│       └── validator.js           # Esquemas de Joi
├── tests/
│   └── index.test.js              # Tests de la API
├── database.js                    # Conexión a la base de datos
├── server.js                      # Configuración de Express
├── index.js                       # Punto de entrada
├── package.json
└── README.md
```

## 🚀 Comenzando

### Prerequisitos

- Node.js (v14 o superior)
- MySQL (v5.7 o superior)
- npm o yarn

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/iverrr78/Backend-Prueba-Tecnica-To-Do-App.git
   cd Backend-Prueba-Tecnica-To-Do-App
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   
   Crear un archivo `.env` en el directorio raíz:
   ```env
   PORT=3001
   DB_HOST=localhost
   DB_USER=tu_usuario_mysql
   DB_PASSWORD=tu_contraseña_mysql
   DB_NAME=todo_app
   DB_PORT=3306
   JWT_SECRET=tu_clave_secreta_jwt_super_segura
   ```

4. **Crear la base de datos**
   ```sql
   CREATE DATABASE todo_app;
   ```

5. **Iniciar el servidor**
   
   Modo desarrollo (con reinicio automático):
   ```bash
   npm run dev
   ```
   
   Modo producción:
   ```bash
   npm start
   ```

El servidor se iniciará en `http://localhost:3001`

## 📚 Documentación de la API

### Endpoints de Autenticación

#### Registrar un nuevo usuario
```http
POST /auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Respuesta (201)**
```json
{
  "message": "User successfully registered.",
  "user": {
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

#### Iniciar sesión
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Respuesta (200)**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

### Endpoints de Tareas

> **Nota:** Todos los endpoints de tareas requieren autenticación. Incluye el token JWT en el header de Autorización:
> ```
> Authorization: Bearer <tu_token>
> ```

#### Obtener todas las tareas
```http
GET /task
Authorization: Bearer <token>
```

**Respuesta (200)**
```json
{
  "message": "Tasks retrieved successfully",
  "tasks": [
    {
      "id": 1,
      "title": "Completar proyecto",
      "description": "Terminar la app de To-Do",
      "completed": false,
      "userId": 1
    }
  ]
}
```

#### Crear una nueva tarea
```http
POST /task/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Comprar víveres",
  "description": "Leche, huevos, pan"
}
```

**Respuesta (201)**
```json
{
  "message": "Task created successfully",
  "task": {
    "id": 2,
    "title": "Comprar víveres",
    "description": "Leche, huevos, pan",
    "completed": false,
    "userId": 1
  }
}
```

#### Actualizar una tarea (marcar como completada)
```http
PATCH /task/update/:id
Authorization: Bearer <token>
```

**Respuesta (200)**
```json
{
  "message": "Task updated successfully"
}
```

#### Eliminar una tarea
```http
DELETE /task/delete/:id
Authorization: Bearer <token>
```

**Respuesta (200)**
```json
{
  "message": "Task deleted successfully"
}
```

## 🧪 Testing

Ejecutar tests:
```bash
npm test
```

Ejecutar tests en modo watch:
```bash
npm run test:watch
```

Generar reporte de cobertura:
```bash
npm run test:coverage
```

## 🗄️ Esquema de la Base de Datos

### Tabla Users (Usuarios)
| Columna   | Tipo         | Restricciones        |
|-----------|--------------|----------------------|
| id        | INTEGER      | PRIMARY KEY, AUTO_INCREMENT |
| username  | VARCHAR(255) | NOT NULL             |
| email     | VARCHAR(255) | UNIQUE, NOT NULL     |
| password  | VARCHAR(255) | NOT NULL (hasheada)  |
| createdAt | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP |
| updatedAt | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP |

### Tabla Tasks (Tareas)
| Columna     | Tipo         | Restricciones        |
|-------------|--------------|----------------------|
| id          | INTEGER      | PRIMARY KEY, AUTO_INCREMENT |
| title       | VARCHAR(255) | NOT NULL             |
| description | TEXT         |                      |
| completed   | BOOLEAN      | DEFAULT false        |
| userId      | INTEGER      | FOREIGN KEY (Users.id) |
| createdAt   | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP |
| updatedAt   | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP |

## 🔒 Seguridad

- Las contraseñas se hashean usando bcryptjs con salt rounds
- Los tokens JWT expiran después de 1 hora
- Las rutas protegidas requieren autenticación JWT válida
- Validación de entrada en todos los endpoints usando esquemas de Joi
- CORS habilitado para peticiones de origen cruzado

## 📝 Licencia

MIT

## 👤 Autor

[iverrr78](https://github.com/iverrr78)

## 🤝 Contribuciones

¡Las contribuciones, problemas y solicitudes de características son bienvenidas!

1. Haz un Fork del proyecto
2. Crea tu rama de características (`git checkout -b feature/CaracteristicaIncreible`)
3. Haz commit de tus cambios (`git commit -m 'Agregar alguna CaracteristicaIncreible'`)
4. Haz push a la rama (`git push origin feature/CaracteristicaIncreible`)
5. Abre un Pull Request

