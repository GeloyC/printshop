<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ServiceController;

Route::get('/test', function () {
    return 'Hello test';
});

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::delete('/auth/logout', [AuthController::class, 'logout']);
Route::get('/auth/me', [AuthController::class, 'me']);

Route::get('/services', [ServiceController::class, 'index']);
Route::get("/client/service/{slug}", [ServiceController::class, 'getClientService']);
Route::get("/services/names", [ServiceController::class, 'getNames']);


Route::middleware(['auth', 'admin'])->group(function () {
    Route::post('/service/new', [ServiceController::class, 'store']);
    Route::get("/admin/service/{slug}", [ServiceController::class, 'show']);
    Route::put("/service/{id}", [ServiceController::class, 'update']);
    Route::delete("/service/{id}", [ServiceController::class, 'destroy']);
});