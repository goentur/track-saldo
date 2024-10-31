<?php

use App\Http\Controllers\Transaksi\Pengeluaran\KonsumtifController;
use App\Http\Controllers\Transaksi\Pengeluaran\ProduktifController;
use App\Http\Controllers\Transaksi\Penjualan\PaketDataController;
use App\Http\Controllers\Transaksi\Penjualan\PulsaController;
use App\Http\Controllers\Transaksi\Transfer\InvestasiController;
use App\Http\Controllers\Transaksi\Transfer\MutasiSaldoController;
use App\Http\Controllers\Transaksi\Transfer\PenghasilanLainController;
use App\Http\Controllers\Transaksi\Transfer\PinjamController;
use App\Http\Controllers\Transaksi\Transfer\TabunganController;
use App\Http\Controllers\Transaksi\Transfer\TarikTunaiController;
use App\Http\Controllers\Transaksi\Transfer\TarikTunaiEDCController;
use App\Http\Controllers\Transaksi\Transfer\TopUpController;
use App\Http\Controllers\Transaksi\Transfer\TunaiController;
use App\Http\Controllers\Transaksi\Transfer\ViaATMNasabahController;
use App\Http\Controllers\TransaksiController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->prefix('transaksi')->name('transaksi.')->group(function () {
    Route::get('menu', [TransaksiController::class, 'index'])->name('menu');
    Route::post('tabungan', [TransaksiController::class, 'tabungan'])->name('tabungan');
    Route::post('data', [TransaksiController::class, 'data'])->name('data');
    Route::post('get', [TransaksiController::class, 'get'])->name('get');
    Route::middleware('role:pemilik')->post('{transaksi}/hapus', [TransaksiController::class, 'hapus'])->name('hapus');
    Route::prefix('pengeluaran')->name('pengeluaran.')->group(function () {
        Route::prefix('produktif')->name('produktif.')->controller(ProduktifController::class)->group(function () {
            Route::post('simpan', 'simpan')->name('simpan');
            Route::post('data', 'data')->name('data');
        });
        Route::prefix('konsumtif')->name('konsumtif.')->controller(KonsumtifController::class)->group(function () {
            Route::post('simpan', 'simpan')->name('simpan');
            Route::post('data', 'data')->name('data');
        });
    });
    Route::prefix('transfer')->name('transfer.')->group(function () {
        Route::middleware('role:pemilik')->prefix('mutasi-saldo')->name('mutasi-saldo.')->controller(MutasiSaldoController::class)->group(function () {
            Route::post('simpan', 'simpan')->name('simpan');
        });
        Route::prefix('pinjam')->name('pinjam.')->controller(PinjamController::class)->group(function () {
            Route::post('meminjamkan', 'meminjamkan')->name('meminjamkan');
            Route::post('pinjam', 'pinjam')->name('pinjam');
        });
        Route::prefix('penghasilan-lain')->name('penghasilan-lain.')->controller(PenghasilanLainController::class)->group(function () {
            Route::post('simpan', 'simpan')->name('simpan');
        });
        Route::prefix('via-atm-nasabah')->name('via-atm-nasabah.')->controller(ViaATMNasabahController::class)->group(function () {
            Route::post('simpan',  'simpan')->name('simpan');
        });
        Route::prefix('top-up')->name('top-up.')->controller(TopUpController::class)->group(function () {
            Route::post('simpan', 'simpan')->name('simpan');
        });
        Route::prefix('tunai')->name('tunai.')->controller(TunaiController::class)->group(function () {
            Route::post('simpan', 'simpan')->name('simpan');
        });
        Route::prefix('tarik-tunai')->name('tarik-tunai.')->controller(TarikTunaiController::class)->group(function () {
            Route::post('simpan', 'simpan')->name('simpan');
        });
        Route::prefix('tarik-tunai-edc')->name('tarik-tunai-edc.')->controller(TarikTunaiEDCController::class)->group(function () {
            Route::post('simpan', 'simpan')->name('simpan');
        });
        Route::prefix('investasi')->name('investasi.')->controller(InvestasiController::class)->group(function () {
            Route::post('setor', 'setor')->name('setor');
            Route::post('tarik', 'tarik')->name('tarik');
        });
        Route::prefix('tabungan')->name('tabungan.')->controller(TabunganController::class)->group(function () {
            Route::post('setor', 'setor')->name('setor');
            Route::post('tarik', 'tarik')->name('tarik');
        });
    });
    Route::prefix('penjualan')->name('penjualan.')->group(function () {
        Route::prefix('pulsa')->name('pulsa.')->controller(PulsaController::class)->group(function () {
            Route::post('simpan', 'simpan')->name('simpan');
        });
        Route::prefix('paket-data')->name('paket-data.')->controller(PaketDataController::class)->group(function () {
            Route::post('simpan', 'simpan')->name('simpan');
        });
    });
});
