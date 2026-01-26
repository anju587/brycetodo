<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;

// Authentication routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Todo routes
    Route::get('/todos', [TodoController::class, 'index']);
    Route::post('/todos', [TodoController::class, 'store']);
    Route::put('/todos/{id}', [TodoController::class, 'update']);
    Route::delete('/todos/{id}', [TodoController::class, 'destroy']);
    
    // Subtask routes
    Route::post('/todos/{todoId}/subtasks', [TodoController::class, 'addSubtask']);
    Route::delete('/todos/{todoId}/subtasks/{subtaskId}', [TodoController::class, 'deleteSubtask']);
});
