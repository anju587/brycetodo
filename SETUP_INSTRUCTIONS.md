# Setup Instructions

## Backend Setup (Laravel)

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies (if not already done):
```bash
composer install
```

3. Create .env file (copy from .env.example if it doesn't exist):
```bash
copy .env.example .env
```

4. Generate application key:
```bash
php artisan key:generate
```

5. Configure your database in `.env` file:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=todo_app
DB_USERNAME=root
DB_PASSWORD=your_password
```

6. Run migrations:
```bash
php artisan migrate
```

7. Start the server:
```bash
php artisan serve
```

The backend will run on http://localhost:8000

## Frontend Setup (React)

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies (if not already done):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```
or
```bash
npm start
```

The frontend will run on http://localhost:3000

## Common Issues Fixed

1. ✅ Created missing storage directories
2. ✅ Fixed CORS middleware in Kernel.php
3. ✅ Added missing Controller imports
4. ✅ Created AppServiceProvider
5. ✅ Created necessary config files
6. ✅ Fixed artisan file

## Notes

- Make sure MySQL is running before starting the backend
- The frontend expects the backend to be running on port 8000
- If you get CORS errors, check that `SANCTUM_STATEFUL_DOMAINS` in .env includes `localhost:3000`
