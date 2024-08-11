<?php

namespace App\Http\Controllers\Transaksi;

use App\Enums\TipePengaturan;
use App\Enums\TipePengaturanNominal;
use App\Http\Controllers\Controller;
use App\Services\Master\TabunganService;
use App\Services\Master\TokoService;
use App\Services\PengaturanNominalService;
use App\Services\PengaturanService;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function __construct(
        protected TokoService $toko,
        protected TabunganService $tabungan,
        protected PengaturanService $pengaturan,
        protected PengaturanNominalService $pengaturanNominal,
    ) {
    }
    public function index(Request $request)
    {
        $toko = $this->toko->getTokosByUser(['id'])->count();
        $pengaturanTunai = $this->pengaturan->getPengaturanByToko(['id'], TipePengaturan::TUNAI)->count();
        $pengaturanNominal = $this->pengaturanNominal->getPengaturanNominalByToko(['id'], TipePengaturanNominal::BIAYA_TRANSFER)->count();
        if ($pengaturanTunai == $toko && $pengaturanNominal == $toko) {
            if (auth()->user()->hasRole('pemilik')) {
                $kirim = [
                    'tokos' => $this->toko->getTokosByUser(['id', 'nama']),
                    'tabungans' => null,
                ];
            } else {
                $kirim = [
                    'tokos' => $this->toko->getTokosByUser(['id', 'nama']),
                    'tabungans' => $this->tabungan->gatAllData($request->search, $request->perpage),
                ];
            }
            return inertia('Transaksi/Menu', $kirim);
        } else {
            return inertia('Error', ['message' => 'Pengaturan Tunai belum lengkap, silahkan lengkapi pada menu pengaturan']);
        }
    }
}
