<?php

namespace App\Http\Controllers\Transaksi;

use App\Enums\TipePengaturan;
use App\Enums\TipePengaturanNominal;
use App\Http\Controllers\Controller;
use App\Services\Master\TokoService;
use App\Services\PengaturanNominalService;
use App\Services\PengaturanService;

class MenuController extends Controller
{
    public function __construct(
        protected TokoService $toko,
        protected PengaturanService $pengaturan,
        protected PengaturanNominalService $pengaturanNominal,
    ) {
    }
    public function index()
    {
        $toko = $this->toko->getTokosByUser(['id'])->count();
        $pengaturanTunai = $this->pengaturan->getPengaturanByToko(['id'], TipePengaturan::TUNAI)->count();
        $pengaturanNominal = $this->pengaturanNominal->getPengaturanNominalByToko(['id'], TipePengaturanNominal::BIAYA_TRANSFER)->count();
        if ($pengaturanTunai == $toko && $pengaturanNominal == $toko) {
            return inertia('Transaksi/Menu');
        } else {
            return inertia('Error', ['message' => 'Pengaturan Tunai belum lengkap, silahkan lengkapi pada menu pengaturan']);
        }
    }
}
