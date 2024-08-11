<?php

namespace App\Http\Controllers\Pengaturan;

use App\Enums\TipePengaturan;
use App\Http\Controllers\Controller;
use App\Services\Master\TabunganService;
use App\Services\PengaturanService;
use Illuminate\Http\Request;

class TunaiController extends Controller
{
    public function __construct(
        protected PengaturanService $pengaturan,
        protected TabunganService $tabungan,
    ) {
    }
    public function tambah()
    {
        return inertia('Pengaturan/Tunai/Tambah', [
            'tabungans' => $this->tabungan->getTabungansByToko(['id', 'toko_id', 'merek_id', 'no']),
        ]);
    }
    public function simpan(Request $request)
    {
        $request->validate([
            'toko' => ['required', 'uuid'],
            'tabungan' => ['required', 'uuid'],
        ]);
        $getDataPengaturan = $this->pengaturan->getWhereOne(['id'], ['toko_id' => $request->toko, 'tipe' => TipePengaturan::TUNAI]);
        if (!$getDataPengaturan) {
            $this->pengaturan->simpan([
                'user_id' => auth()->user()->id,
                'toko_id' => $request->toko,
                'tabungan_id' => $request->tabungan,
                'tipe' => TipePengaturan::TUNAI,
                'tanggal' => time(),
            ]);
            return to_route('pengaturan.index')->with('success', 'Data berhasil ditambahkan.');
        } else {
            return to_route('pengaturan.tunai.tambah')->with('error', 'Data Pengaturan Tunai pada toko yang dipilih sudah ada, silahkan diubah saja.');
        }
    }
    public function edit($id)
    {
        return inertia('Pengaturan/Tunai/Ubah', [
            'tabungans' => $this->tabungan->getTabungansByToko(['id', 'toko_id', 'merek_id', 'no']),
            'pengaturan' => $this->pengaturan->getWhereOne(['id', 'toko_id', 'tabungan_id'], ['id' => $id]),
        ]);
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'toko' => ['required', 'uuid', 'unique:pengaturans,toko_id,' . $id],
            'tabungan' => ['required', 'uuid'],
        ]);
        $this->pengaturan->update([
            'user_id' => auth()->user()->id,
            'toko_id' => $request->toko,
            'tabungan_id' => $request->tabungan,
            'tanggal' => time(),
        ], $id);
        return to_route('pengaturan.index')->with('success', 'Data berhasil diubah.');
    }
}
