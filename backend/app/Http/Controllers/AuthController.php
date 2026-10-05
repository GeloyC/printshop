<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use App\Models\User;

class AuthController extends Controller
{
    //
    public function register(Request $request) {

        $validated = $request->validate([
            'name' => ['required', 'string'],
            'email' => ['required', 'string'],
            'password'=> ['required', 'min:12']
        ]);

        $name = $validated['name'];
        $email = $validated['email'];
        $password = $validated['password']; 

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'],
        ]);
    }
}
