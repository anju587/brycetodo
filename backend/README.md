# Todo App - Backend

Laravel backend API for the Todo App.

## Installation

1. Install dependencies:
```bash
composer install
```

2. Copy environment file:
```bash
cp .env.example .env
```

3. Generate application key:
```bash
php artisan key:generate
```

4. Configure your database in `.env` file:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=todo_app
DB_USERNAME=root
DB_PASSWORD=
```

5. Run migrations:
```bash
php artisan migrate
```

6. Start the server:
```bash
php artisan serve
```

The API will be available at http://localhost:8000

## API Endpoints

### Authentication
- POST `/api/register` - Register a new user
- POST `/api/login` - Login user
- POST `/api/logout` - Logout user (requires authentication)
- POST `/api/forgot-password` - Request password reset
- POST `/api/reset-password` - Reset password

### Todos (requires authentication)
- GET `/api/todos` - Get all todos for authenticated user
- POST `/api/todos` - Create a new todo
- PUT `/api/todos/{id}` - Update a todo
- DELETE `/api/todos/{id}` - Delete a todo

### Subtasks (requires authentication)
- POST `/api/todos/{todoId}/subtasks` - Add a subtask to a todo
- DELETE `/api/todos/{todoId}/subtasks/{subtaskId}` - Delete a subtask
