<?php

namespace App\Http\Controllers\Pengaturan;

use App\Enums\TipePengaturanNominal;
use App\Http\Controllers\Controller;
use App\Services\Master\TokoService;
use App\Services\PengaturanNominalService;
use Illuminate\Http\Request;

class BiayaTransferController extends Controller
{
    public function __construct(
        protected PengaturanNominalService $pengaturanNominal,
        protected TokoService $toko,
    ) {
    }
    public function tambah()
    {
        return inertia('Pengaturan/BiayaTransfer/Tambah', [
            'tokos' => $this->toko->getTokosByUser(['id', 'nama']),
        ]);
    }
    public function simpan(Request $request)
    {
        $request->validate([
            'toko' => ['required', 'uuid'],
            'nominal' => ['required', 'numeric'],
        ]);
        $getDataPengaturan = $this->pengaturanNominal->getWhereOne(['id'], ['toko_id' => $request->toko, 'tipe' => TipePengaturanNominal::BIAYA_TRANSFER]);
        if (!$getDataPengaturan) {
            $this->pengaturanNominal->simpan([
                'user_id' => auth()->user()->id,
                'toko_id' => $request->toko,
                'nominal' => $request->nominal,
                'tipe' => TipePengaturanNominal::BIAYA_TRANSFER,
                'tanggal' => time(),
            ]);
            return to_route('profil.pengaturan.index')->with('success', 'Data berhasil ditambahkan.');
        } else {
            return to_route('profil.pengaturan.biaya-transfer.tambah')->with('error', 'Data Pengaturan Biaya Transfer pada toko yang dipilih sudah ada, silahkan diubah saja.');
        }
    }
    public function edit($id)
    {
        return inertia('Pengaturan/BiayaTransfer/Ubah', [
            'tokos' => $this->toko->getTokosByUser(['id', 'nama']),
            'pengaturanNominal' => $this->pengaturanNominal->getWhereOne(['id', 'toko_id', 'nominal'], ['id' => $id]),
        ]);
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'toko' => ['required', 'uuid', 'unique:pengaturan_nominals,toko_id,' . $id],
            'nominal' => ['required', 'numeric'],
        ]);
        $this->pengaturanNominal->update([
            'user_id' => auth()->user()->id,
            'toko_id' => $request->toko,
            'nominal' => $request->nominal,
            'tanggal' => time(),
        ], $id);
        return to_route('profil.pengaturan.index')->with('success', 'Data berhasil diubah.');
    }
    public function dataByToko(Request $request)
    {
        $request->validate([
            'toko' => ['required', 'uuid'],
        ]);
        $pengaturanNominal = $this->pengaturanNominal->getWhereOne(['id', 'nominal'], [
            'toko_id' => $request->toko,
            'tipe' => TipePengaturanNominal::BIAYA_TRANSFER
        ]);
        return response()->json(['nominal' => "Rp " . rupiah($pengaturanNominal->nominal)], 200);
    }
}
