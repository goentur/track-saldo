<?php

use App\Http\Controllers\ProfilController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->prefix('profil')->name('profil.')->group(function () {
    Route::get('/', [ProfilController::class, 'index'])->name('index');
    Route::post('ubah-password', [ProfilController::class, 'ubahPassword'])->name('ubah-password');
});
