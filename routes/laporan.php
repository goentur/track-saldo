<?php

use App\Http\Controllers\Laporan\LaporanController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::controller(LaporanController::class)->prefix('laporan')->name('laporan.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::prefix('data')->name('data.')->group(function () {
            Route::post('transaksi', 'transaksi')->name('transaksi');
            Route::post('transaksi-detail', 'transaksiDetail')->name('transaksi.detail');
        });
        Route::middleware('role:pemilik')->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('detail', 'detail')->name('detail');
        });
    });
});
