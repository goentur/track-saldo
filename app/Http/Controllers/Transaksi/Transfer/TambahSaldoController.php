<?php

namespace App\Http\Controllers\Transaksi\Transfer;

use App\Http\Controllers\Controller;
use App\Services\Master\AnggotaService;
use App\Services\Master\TabunganService;
use App\Services\Master\TokoService;
use App\Services\TransferService;

class TambahSaldoController extends Controller
{
    public function __construct(
        protected TokoService $toko,
        protected TransferService $transfer,
        protected TabunganService $tabungan,
        protected AnggotaService $anggota,
    ) {
    }
    public function index()
    {
        return inertia('Transaksi/Transfer/TambahSaldo/Index', [
            'tokos' => $this->toko->get(['id', 'nama']),
        ]);
    }
}
