<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    //
    public function register(Request $request) {

        $validated = $request->validate([
            'name' => ['required', 'string'],
            'email' => ['required', 'string'],
            'password'=> ['required', 'min:8']
        ]);

        $name = $validated['name'];
        $email = $validated['email'];
        $password = $validated['password']; 

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'],
        ]);

        Auth::login($user);
        $request->session()->regenerate();

        return response()->json([
            "message"=>"registration success"
        ]);
    }


    public function login(Request $request) {
        $validated = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string']
        ]);


        $user = User::where('email', $validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'message' => 'invalid credential'
            ], 401);
        }
        
        Auth::login($user);
        $request->session()->regenerate();

        return response()->json([
            'message' => 'login successful.',
        ]);
    }


    public function logout (Request $request) {
        $request->session()->flush();

        return response()->json([
            'message' => 'logout successfully.',
        ]);
    }


    public function me(Request $request) {
        return response()->json([
            'authenticated' => Auth::check(),
            'user' => $request->user(),
        ]);
    }
}
