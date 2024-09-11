<?php

use App\Http\Controllers\Master\AnggotaController;
use App\Http\Controllers\Master\MenuController;
use App\Http\Controllers\Master\MerekController;
use App\Http\Controllers\Master\PaketController;
use App\Http\Controllers\Master\PegawaiController;
use App\Http\Controllers\Master\PemilikController;
use App\Http\Controllers\Master\TabunganController;
use App\Http\Controllers\Master\TokoController;
use App\Http\Controllers\Master\ZonaWaktuController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->prefix('master')->name('master.')->group(function () {
    Route::post('anggota/data-by-toko', [AnggotaController::class, 'dataByToko'])->name('anggota.data-by-toko');
    Route::post('tabungan/data-by-toko', [TabunganController::class, 'dataByToko'])->name('tabungan.data-by-toko');
    Route::post('paket/pulsa/by-toko', [PaketController::class, 'pulsaByToko'])->name('paket.pulsa.by-toko');

    Route::get('/menu', [MenuController::class, 'index'])->name('menu');
    Route::middleware('role:developer')->group(function () {
        Route::resource('zona-waktu', ZonaWaktuController::class);
        Route::resource('toko', TokoController::class);
        Route::resource('pemilik', PemilikController::class);
    });
    Route::middleware('role:pemilik')->group(function () {
        Route::resource('anggota', AnggotaController::class);
        Route::resource('merek', MerekController::class);
        Route::resource('tabungan', TabunganController::class);
        Route::resource('pegawai', PegawaiController::class);
        Route::resource('paket', PaketController::class);
    });
});
