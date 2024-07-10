<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\Master\MerekController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('login', [LoginController::class, 'index'])->name('login');
    Route::post('login', [LoginController::class, 'store'])->name('login.submit');
});
Route::middleware('auth')->group(function () {
    Route::delete('logout', [LoginController::class, 'destroy'])->name('logout');
    Route::get('home', [HomeController::class, 'index'])->name('home');
    Route::middleware('role:pemilik')->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::prefix('master')->group(function () {
            Route::get('merek', [MerekController::class, 'index'])->name('master.merek');
        });
    });
});