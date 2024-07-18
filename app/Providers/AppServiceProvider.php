<?php

namespace App\Providers;

use App\Repositories\Master\Anggota\AnggotaRepository;
use App\Repositories\Master\Anggota\AnggotaRepositoryInterface;
use App\Repositories\Master\Merek\MerekRepository;
use App\Repositories\Master\Merek\MerekRepositoryInterface;
use App\Repositories\Master\Pegawai\PegawaiRepository;
use App\Repositories\Master\Pegawai\PegawaiRepositoryInterface;
use App\Repositories\Master\Pemilik\PemilikRepository;
use App\Repositories\Master\Pemilik\PemilikRepositoryInterface;
use App\Repositories\Master\Tabungan\TabunganRepository;
use App\Repositories\Master\Tabungan\TabunganRepositoryInterface;
use App\Repositories\Master\Toko\TokoRepository;
use App\Repositories\Master\Toko\TokoRepositoryInterface;
use App\Repositories\Master\ZonaWaktu\ZonaWaktuRepository;
use App\Repositories\Master\ZonaWaktu\ZonaWaktuRepositoryInterface;
use App\Repositories\Transfer\TransferRepository;
use App\Repositories\Transfer\TransferRepositoryInterface;
use App\Services\Master\AnggotaService;
use App\Services\Master\MerekService;
use App\Services\Master\PegawaiService;
use App\Services\Master\PemilikService;
use App\Services\Master\TabunganService;
use App\Services\Master\TokoService;
use App\Services\Master\ZonaWaktuService;
use App\Services\TransferService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //zona waktu
        $this->app->bind(ZonaWaktuRepositoryInterface::class, ZonaWaktuRepository::class);
        $this->app->bind(ZonaWaktuService::class, function ($app) {
            return new ZonaWaktuService($app->make(ZonaWaktuRepositoryInterface::class));
        });
        
        //merek
        $this->app->bind(MerekRepositoryInterface::class, MerekRepository::class);
        $this->app->bind(MerekService::class, function ($app) {
            return new MerekService($app->make(MerekRepositoryInterface::class));
        });

        //toko
        $this->app->bind(TokoRepositoryInterface::class, TokoRepository::class);
        $this->app->bind(TokoService::class, function ($app) {
            return new TokoService($app->make(TokoRepositoryInterface::class));
        });

        //pemilk
        $this->app->bind(PemilikRepositoryInterface::class, PemilikRepository::class);
        $this->app->bind(PemilikService::class, function ($app) {
            return new PemilikService($app->make(PemilikRepositoryInterface::class));
        });

        //anggota
        $this->app->bind(AnggotaRepositoryInterface::class, AnggotaRepository::class);
        $this->app->bind(AnggotaService::class, function ($app) {
            return new AnggotaService($app->make(AnggotaRepositoryInterface::class));
        });

        //tabungan
        $this->app->bind(TabunganRepositoryInterface::class, TabunganRepository::class);
        $this->app->bind(TabunganService::class, function ($app) {
            return new TabunganService($app->make(TabunganRepositoryInterface::class));
        });

        //tabungan
        $this->app->bind(PegawaiRepositoryInterface::class, PegawaiRepository::class);
        $this->app->bind(PegawaiService::class, function ($app) {
            return new PegawaiService($app->make(PegawaiRepositoryInterface::class));
        });

        //transfer
        $this->app->bind(TransferRepositoryInterface::class, TransferRepository::class);
        $this->app->bind(TransferService::class, function ($app) {
            return new TransferService($app->make(TransferRepositoryInterface::class));
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
