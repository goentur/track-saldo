<?php

use App\Http\Controllers\TransaksiController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::controller(TransaksiController::class)->prefix('laporan')->name('laporan.')->group(function () {
        Route::prefix('data')->name('data.')->group(function () {
            Route::post('transaksi', 'transaksi')->name('transaksi');
            Route::post('transaksi-detail', 'transaksiDetail')->name('transaksi.detail');
        });
    });
});
