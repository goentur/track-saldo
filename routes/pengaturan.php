<?php

use App\Http\Controllers\Pengaturan\BiayaTransferController;
use App\Http\Controllers\Pengaturan\PengaturanController;
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
            Route::get('biaya-transfer/tambah', [BiayaTransferController::class, 'tambah'])->name('biaya-transfer.tambah');
            Route::post('biaya-transfer/simpan', [BiayaTransferController::class, 'simpan'])->name('biaya-transfer.simpan');
            Route::get('biaya-transfer/edit/{id}', [BiayaTransferController::class, 'edit'])->name('biaya-transfer.edit');
            Route::put('biaya-transfer/update/{id}', [BiayaTransferController::class, 'update'])->name('biaya-transfer.update');
        });
    });
    Route::post('peraturan-nominal/data-by-toko', [BiayaTransferController::class, 'dataByToko'])->name('pengaturan.biaya-transfer.data-by-toko');
});
