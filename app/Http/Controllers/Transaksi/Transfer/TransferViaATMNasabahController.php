<?php

namespace App\Http\Controllers\Transaksi\Transfer;

use App\Http\Controllers\Controller;
use App\Services\Master\AnggotaService;
use Illuminate\Http\Request;

class TransferViaATMNasabahController extends Controller
{
    public function __construct(
        protected AnggotaService $anggota,
    ) {
    }
    public function index()
    {
        return inertia('Transaksi/Transfer/ViaATMNasabah/Index', [
            'anggotas' => $this->anggota->getAnggotasByUser(['id', 'toko_id', 'nama', 'alamat']),
        ]);
    }
}
