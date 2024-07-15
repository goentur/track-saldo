<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Master\AnggotaController;
use App\Http\Controllers\Master\MerekController;
use App\Http\Controllers\Master\PegawaiController;
use App\Http\Controllers\Master\PemilikController;
use App\Http\Controllers\Master\TabunganController;
use App\Http\Controllers\Master\TokoController;
use App\Http\Controllers\Master\ZonaWaktuController;
use App\Http\Controllers\Transaksi\Transfer\TransferController;
use App\Http\Controllers\Transaksi\Transfer\TransferViaATMNasabahController;
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
    Route::middleware('role:developer')->group(function () {
        Route::prefix('master')->group(function () {
            Route::resource('zona-waktu', ZonaWaktuController::class);
            Route::resource('toko', TokoController::class);
            Route::resource('pemilik', PemilikController::class);
        });
    });
    Route::middleware('role:pemilik')->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::prefix('master')->group(function () {
            Route::resource('merek', MerekController::class);
            Route::resource('anggota', AnggotaController::class);
            Route::resource('tabungan', TabunganController::class);
            Route::resource('pegawai', PegawaiController::class);
        });
        Route::prefix('transfer')->group(function () {
            Route::get('menu', [TransferController::class, 'index'])->name('transfer.menu');
            Route::prefix('via-atm-nasabah')->name('via-atm-nasabah.')->group(function () {
                Route::get('/', [TransferViaATMNasabahController::class, 'index'])->name('index');
            });
        });
    });
});