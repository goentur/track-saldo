<?php

use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\Pengunjung;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
    web: [
        __DIR__ . '/../routes/web.php',
        __DIR__ . '/../routes/master.php',
        __DIR__ . '/../routes/laporan.php',
        __DIR__ . '/../routes/transaksi.php',
        __DIR__ . '/../routes/pengaturan.php',
        __DIR__ . '/../routes/profil.php',
    ],
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
    $middleware->web(append: [
        HandleInertiaRequests::class,
    ]);
    $middleware->alias(['pengunjung' => Pengunjung::class,
        'role' => \Spatie\Permission\Middleware\RoleMiddleware::class,
        'permission' => \Spatie\Permission\Middleware\PermissionMiddleware::class,
        'role_or_permission' => \Spatie\Permission\Middleware\RoleOrPermissionMiddleware::class,
    ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
