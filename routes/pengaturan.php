<?php

use App\Http\Controllers\Pengaturan\PengaturanController;
use App\Http\Controllers\Pengaturan\TokoController;
use App\Http\Controllers\Pengaturan\TunaiController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::middleware('role:pemilik')->group(function () {
        Route::prefix('pengaturan')->name('pengaturan.')->group(function () {
            Route::get('/', [PengaturanController::class, 'index'])->name('index');
            Route::get('tunai/tambah', [TunaiController::class, 'tambah'])->name('tunai.tambah');
            Route::post('tunai/simpan', [TunaiController::class, 'simpan'])->name('tunai.simpan');
            Route::get('tunai/edit/{id}', [TunaiController::class, 'edit'])->name('tunai.edit');
            Route::put('tunai/update/{id}', [TunaiController::class, 'update'])->name('tunai.update');
            // tokos
            Route::get('toko/edit/{id}', [TokoController::class, 'edit'])->name('toko.edit');
            Route::post('toko/update', [TokoController::class, 'update'])->name('toko.update');
        });
    });
});
