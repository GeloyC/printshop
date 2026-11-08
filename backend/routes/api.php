<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\OrderController;


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
Route::get("service/configurations", [ServiceController::class, 'getConfigurations']);
Route::get("/service/{slug}/configuration", [ServiceController::class, 'getConfiguration']);
Route::get("/cart/item-count", [CartItemController::class, 'cartItemCount']);

Route::middleware(['auth'])->group(function () {
    Route::post("/order/add-to-cart/{user_id}", [CartItemController::class, 'store']);
    Route::get("/order/cart", [CartItemController::class, 'index']);
    Route::patch("/order/cart/item/{id}/add", [CartItemController::class, 'addItemQuantity']);
    Route::patch("/order/cart/item/{id}/subtract", [CartItemController::class, 'subtractItemQuantity']);
    Route::patch("order/cart/item/{id}/configuration", [CartItemController::class, 'updateItemConfiguration']);
    Route::delete("/order/cart/item/{id}/delete", [CartItemController::class, 'destroy']);
    Route::post("/order/cart/checkout", [OrderController::class, 'checkout']);
    Route::get("/order/list" , [OrderController::class, 'getOrdersByStatus']);
    Route::get("/order/list/count", [OrderController::class, 'getOrderPlacedCount']);
});


Route::middleware(['auth', 'admin'])->group(function () {
    Route::post('/service/new', [ServiceController::class, 'store']);
    Route::get("/admin/service/{slug}", [ServiceController::class, 'show']);
    Route::patch("/service/{id}", [ServiceController::class, 'update']);
    Route::delete("/service/{id}", [ServiceController::class, 'destroy']);
});