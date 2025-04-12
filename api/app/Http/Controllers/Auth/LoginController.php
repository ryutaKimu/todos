<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request){
        if(Auth::attempt($request->only('email', 'password'))){
            $user = User::find(1);
            $token = $user->createToken('todoApp')->plainTextToken;

            return response()->json(['token' => $token]);
        }

        return response()->json(['message' => '認証失敗です'], 401);
    }
}