<?php

use App\Http\Controllers\Transaksi\MenuController;
use App\Http\Controllers\Transaksi\Pengeluaran\ProduktifController;
use App\Http\Controllers\Transaksi\Penjualan\PaketDataController;
use App\Http\Controllers\Transaksi\Penjualan\PulsaController;
use App\Http\Controllers\Transaksi\Transfer\MutasiSaldoController;
use App\Http\Controllers\Transaksi\Transfer\TarikTunaiController;
use App\Http\Controllers\Transaksi\Transfer\TunaiController;
use App\Http\Controllers\Transaksi\Transfer\ViaATMNasabahController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::middleware('role:pemilik')->group(function () {
        Route::prefix('transaksi')->name('transaksi.')->group(function () {
            Route::get('menu', [MenuController::class, 'index'])->name('menu');
            Route::prefix('transfer')->name('transfer.')->group(function () {
                Route::prefix('via-atm-nasabah')->name('via-atm-nasabah.')->controller(ViaATMNasabahController::class)->group(function () {
                    Route::get('/',  'index')->name('index');
                    Route::post('simpan',  'simpan')->name('simpan');
                });
                Route::prefix('tunai')->name('tunai.')->controller(TunaiController::class)->group(function () {
                    Route::get('/', 'index')->name('index');
                    Route::post('simpan', 'simpan')->name('simpan');
                });
                Route::prefix('mutasi-saldo')->name('mutasi-saldo.')->controller(MutasiSaldoController::class)->group(function () {
                    Route::get('/', 'index')->name('index');
                    Route::post('simpan', 'simpan')->name('simpan');
                });
                Route::prefix('tarik-tunai')->name('tarik-tunai.')->controller(TarikTunaiController::class)->group(function () {
                    Route::get('/', 'index')->name('index');
                    Route::post('simpan', 'simpan')->name('simpan');
                });
            });
            Route::prefix('penjualan')->name('penjualan.')->group(function () {
                Route::prefix('pulsa')->name('pulsa.')->controller(PulsaController::class)->group(function () {
                    Route::get('/', 'index')->name('index');
                    Route::post('simpan', 'simpan')->name('simpan');
                });
                Route::prefix('paket-data')->name('paket-data.')->controller(PaketDataController::class)->group(function () {
                    Route::get('/', 'index')->name('index');
                    Route::post('simpan', 'simpan')->name('simpan');
                });
            });
            Route::prefix('pengeluaran')->name('pengeluaran.')->group(function () {
                Route::prefix('produktif')->name('produktif.')->controller(ProduktifController::class)->group(function () {
                    Route::get('/', 'index')->name('index');
                    Route::post('simpan', 'simpan')->name('simpan');
                });
            });
        });
    });
});
