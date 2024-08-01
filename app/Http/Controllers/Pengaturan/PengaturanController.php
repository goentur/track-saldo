<?php

namespace App\Http\Controllers\Pengaturan;

use App\Enums\TipePengaturan;
use App\Enums\TipePengaturanNominal;
use App\Http\Controllers\Controller;
use App\Services\Master\TabunganService;
use App\Services\PengaturanNominalService;
use App\Services\PengaturanService;

class PengaturanController extends Controller
{
    public function __construct(
        protected PengaturanService $pengaturan,
        protected PengaturanNominalService $pengaturanNominal,
        protected TabunganService $tabungan,
    ) {
    }
    public function index()
    {
        $zwp = zonaWaktuPengguna();
        return inertia('Pengaturan/Index', [
            'pengaturanTunais' => $this->dataPengaturanTunai($zwp),
            'pengaturanBiayaTransfers' => $this->dataPengaturanBiayaTransfer($zwp),
        ]);
    }
    public function dataPengaturanTunai($zwp)
    {
        $data = $this->pengaturan->getPengaturanByToko(['id', 'user_id', 'toko_id', 'tabungan_id', 'tanggal'], TipePengaturan::TUNAI);
        $datas = [];
        foreach ($data as $p) {
            $datas[] = [
                'id' => $p->id,
                'pengguna' => $p->user->name,
                'toko' => $p->toko->nama,
                'tabungan' => $p->tabungan->merek->nama,
                'no_tabungan' => $p->tabungan->no,
                'tanggal' => formatTanggal($p->tanggal, $zwp),
            ];
        }
        return $datas;
    }
    public function dataPengaturanBiayaTransfer($zwp)
    {
        $data = $this->pengaturanNominal->getPengaturanNominalByToko(['id', 'user_id', 'toko_id', 'nominal', 'tanggal'], TipePengaturanNominal::BIAYA_TRANSFER);
        $datas = [];
        foreach ($data as $p) {
            $datas[] = [
                'id' => $p->id,
                'pengguna' => $p->user->name,
                'toko' => $p->toko->nama,
                'nominal' => 'Rp ' . rupiah($p->nominal),
                'tanggal' => formatTanggal($p->tanggal, $zwp),
            ];
        }
        return $datas;
    }
}
