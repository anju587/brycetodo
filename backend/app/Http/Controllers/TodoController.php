<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use App\Models\Subtask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TodoController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index()
    {
        $todos = Todo::where('user_id', auth()->id())
            ->with('subtasks')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($todos);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $todo = Todo::create([
            'user_id' => auth()->id(),
            'name' => $request->name,
        ]);

        $todo->load('subtasks');

        return response()->json($todo, 201);
    }

    public function update(Request $request, $id)
    {
        $todo = Todo::where('user_id', auth()->id())
            ->where('id', $id)
            ->firstOrFail();

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $todo->update([
            'name' => $request->name,
        ]);

        $todo->load('subtasks');

        return response()->json($todo);
    }

    public function destroy($id)
    {
        $todo = Todo::where('user_id', auth()->id())
            ->where('id', $id)
            ->firstOrFail();

        $todo->delete();

        return response()->json([
            'message' => 'Todo deleted successfully'
        ]);
    }

    public function addSubtask(Request $request, $todoId)
    {
        $todo = Todo::where('user_id', auth()->id())
            ->where('id', $todoId)
            ->firstOrFail();

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $subtask = Subtask::create([
            'todo_id' => $todo->id,
            'name' => $request->name,
        ]);

        return response()->json($subtask, 201);
    }

    public function deleteSubtask($todoId, $subtaskId)
    {
        $todo = Todo::where('user_id', auth()->id())
            ->where('id', $todoId)
            ->firstOrFail();

        $subtask = Subtask::where('todo_id', $todo->id)
            ->where('id', $subtaskId)
            ->firstOrFail();

        $subtask->delete();

        return response()->json([
            'message' => 'Subtask deleted successfully'
        ]);
    }
}
