<?php

namespace App\Providers;

use App\Repositories\Admin\Master\Merek\MerekRepository;
use App\Repositories\Admin\Master\Merek\MerekRepositoryInterface;
use App\Services\Admin\Master\MerekService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(MerekRepositoryInterface::class, MerekRepository::class);
        $this->app->bind(MerekService::class, function ($app) {
            return new MerekService($app->make(MerekRepositoryInterface::class));
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
