<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function register(Request $request) {

        $validated = $request->validate([
            'name' => ['required', 'string'],
            'email' => ['required', 'string'],
            'password'=> ['required', Password::defaults()]
        ], [
            'name.required' => 'Name field is required',
            'email.required' => 'Email field is required',
            'password.required' => 'Password field is required'
        ]);
        

        $name = $validated['name'];
        $email = $validated['email'];
        $password = $validated['password']; 

        $checkuserExist = User::query()
            ->where('email', $email)
            ->exists(); 

        $errors = [];

        if ($checkuserExist) {
            $errors['email'] = ['A user with this email already exists'];
        }
        
        if (!empty($errors)) {
            return response()->json([
                'message' => 'Incorrect or invalid inputs',
                'errors' => $errors,
            ], 402);
        }

        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => $password,
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
        ], [
            'email.required' => 'Email is required',
            'email.email' => 'Please enter a valid email address',
            'password.required' => 'Password is required'
        ]);

        $user = User::where('email', $validated['email'])->first();
        $errors = [];

        if (!$user) {
            $errors['email'] = ['Incorrect email, please try again'];
        }

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            $errors['password'] = ['Incorrect password, please try again'];
        }
        
        if (!empty($errors)) {
            return response()->json([
                'message' => 'The given data was invalid',
                'errors' => $errors
            ], 422);
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
