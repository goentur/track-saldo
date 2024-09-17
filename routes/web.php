<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

Route::middleware('pengunjung')->group(function () {
    Route::get('/', function () {
        return redirect('login');
    })->name('/');
    Route::get('login', [LoginController::class, 'index'])->name('login');
    Route::post('login', [LoginController::class, 'store'])->name('login.submit');
});
Route::middleware('auth')->group(function () {
    Route::delete('logout', [LoginController::class, 'destroy'])->name('logout');
    Route::get('home', [HomeController::class, 'index'])->name('home');
    Route::middleware('role:pemilik')->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    });
    Route::get('/enable-maintenance-mode', function () {
        Artisan::call('down', ['--secret' => '3.PersatuanIndonesia']);
    });
    Route::get('/disable-maintenance-mode', function () {
        Artisan::call('up');
    });
    Route::get('/optimize-clear', function () {
        Artisan::call('optimize:clear');
    });
});