<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TodoController extends Controller
{
    private $todo;

    public function __construct(Todo $todo)
    {
        $this->todo = $todo;
    }

    public function index()
    {
        $todos = $this->todo->all();
        return response()->json([
            'todos' => $todos
        ]);
    }

    public function store(Request $request)
    {   
        if (!Auth::check()) {
            return response()->json(['message' => '認証されていません'], 401);
        }
        $input = $request->input('title');
        $todo = new Todo();
        $todo->title = $input;
        $todo->user_id = Auth::id();
        $todo->save();

        return response()->json(['todo' => $todo]);
    }
}
