<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subtask extends Model
{
    use HasFactory;

    protected $fillable = [
        'todo_id',
        'name',
    ];

    public function todo()
    {
        return $this->belongsTo(Todo::class);
    }
}
