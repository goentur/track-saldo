<?php

namespace App\Http\Controllers\Pengaturan;

use App\Enums\TipePengaturan;
use App\Http\Controllers\Controller;
use App\Services\Master\TabunganService;
use App\Services\Master\TokoService;
use App\Services\PengaturanService;

class PengaturanController extends Controller
{
    public function __construct(
        protected TokoService $toko,
        protected PengaturanService $pengaturan,
        protected TabunganService $tabungan,
    ) {
    }
    public function index()
    {
        $zwp = zonaWaktuPengguna();
        return inertia('Pengaturan/Index', [
            'tokos' => $this->tokos(),
            'pengaturanTunais' => $this->dataPengaturanTunai($zwp),
        ]);
    }
    protected function dataPengaturanTunai($zwp)
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
    protected function tokos()
    {
        $data = [];
        foreach ($this->toko->getTokosByUser(['id', 'nama', 'alamat', 'logo']) as $value) {
            $data[] = [
                'id' => $value->id,
                'nama' => $value->nama,
                'alamat' => $value->alamat,
                'logo' => asset('storage/logos/' . $value->logo),
            ];
        }
        return $data;
    }
}
