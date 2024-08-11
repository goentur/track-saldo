<?php

namespace App\Providers;

use App\Repositories\Laporan\LaporanRepository;
use App\Repositories\Laporan\LaporanRepositoryInterface;
use App\Repositories\Master\Anggota\AnggotaRepository;
use App\Repositories\Master\Anggota\AnggotaRepositoryInterface;
use App\Repositories\Master\Merek\MerekRepository;
use App\Repositories\Master\Merek\MerekRepositoryInterface;
use App\Repositories\Master\Paket\PaketRepository;
use App\Repositories\Master\Paket\PaketRepositoryInterface;
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
use App\Repositories\Pengaturan\PengaturanNominalRepository;
use App\Repositories\Pengaturan\PengaturanNominalRepositoryInterface;
use App\Repositories\Pengaturan\PengaturanRepository;
use App\Repositories\Pengaturan\PengaturanRepositoryInterface;
use App\Repositories\Transfer\TransferRepository;
use App\Repositories\Transfer\TransferRepositoryInterface;
use App\Services\LaporanService;
use App\Services\Master\AnggotaService;
use App\Services\Master\MerekService;
use App\Services\Master\PaketService;
use App\Services\Master\PegawaiService;
use App\Services\Master\PemilikService;
use App\Services\Master\TabunganService;
use App\Services\Master\TokoService;
use App\Services\Master\ZonaWaktuService;
use App\Services\PengaturanNominalService;
use App\Services\PengaturanService;
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

        //paket
        $this->app->bind(PaketRepositoryInterface::class, PaketRepository::class);
        $this->app->bind(PaketService::class, function ($app) {
            return new PaketService($app->make(PaketRepositoryInterface::class));
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

        //laporan
        $this->app->bind(LaporanRepositoryInterface::class, LaporanRepository::class);
        $this->app->bind(LaporanService::class, function ($app) {
            return new LaporanService($app->make(LaporanRepositoryInterface::class));
        });

        //pengaturan
        $this->app->bind(PengaturanRepositoryInterface::class, PengaturanRepository::class);
        $this->app->bind(PengaturanService::class, function ($app) {
            return new PengaturanService($app->make(PengaturanRepositoryInterface::class));
        });

        //pengaturan nominal
        $this->app->bind(PengaturanNominalRepositoryInterface::class, PengaturanNominalRepository::class);
        $this->app->bind(PengaturanNominalService::class, function ($app) {
            return new PengaturanNominalService($app->make(PengaturanNominalRepositoryInterface::class));
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
