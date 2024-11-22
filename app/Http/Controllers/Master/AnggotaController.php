<?php

namespace App\Http\Controllers\Master;

use App\Enums\KeteranganTransferDetail;
use App\Enums\StatusTransfer;
use App\Enums\TipePengaturan;
use App\Enums\TipeSimpananAnggota;
use App\Enums\TipeTransaksi;
use App\Enums\TipeTransaksiDetail;
use App\Http\Controllers\Controller;
use App\Http\Requests\Master\AnggotaRequest;
use App\Http\Requests\Master\DataAnggotaRequest;
use App\Services\Master\AnggotaService;
use App\Services\Master\TabunganService;
use App\Services\Master\TokoService;
use App\Services\PengaturanService;
use App\Services\TransferService;
use Illuminate\Http\Request;

class AnggotaController extends Controller
{
    public function __construct(
        protected AnggotaService $anggota,
        protected TokoService $toko,
        protected PengaturanService $pengaturan,
        protected TransferService $transfer,
        protected TabunganService $tabungan,
    ) {
    }
    public function data(DataAnggotaRequest $request)
    {
        return response()->json($this->anggota->gatAllData($request, null), 200);
    }

    public function simpanAtauUbah(AnggotaRequest $request)
    {
        if ($request->id) {
            $this->anggota->update([
                'nama' => $request->nama,
                'telp' => '0' . $request->telp,
                'alamat' => $request->alamat,
            ], $request->id);
            $pesan = ['pesan' => 'Data berhasil diubah'];
        } else {
            $this->anggota->create([
                'toko_id' => $request->toko_id,
                'nama' => $request->nama,
                'telp' => '0' . $request->telp,
                'alamat' => $request->alamat,
            ]);
            $pesan = ['pesan' => 'Data berhasil disimpan'];
        }
        return response()->json($pesan, 200);
    }
    public function dataByToko(Request $request)
    {
        $request->validate([
            'toko' => ['required', 'uuid'],
        ]);
        return response()->json($this->anggota->getWhere(['id', 'nama', 'alamat'], ['toko_id' => $request->toko]), 200);
    }
    public function tabungan(Request $request)
    {
        $request->validate([
            'anggota' => ['required', 'uuid'],
        ]);
        $simpananAnggota = $this->anggota->getSimpanan([
            'anggota' => $request->anggota,
            'tipe' => TipeSimpananAnggota::TABUNGAN,
        ]);
        $zonaWaktuPengguna = zonaWaktuPengguna();
        $riwayat = [];
        foreach ($this->anggota->ambilRiwayatTabungan(['anggota' => $request->anggota]) as $k) {
            $riwayat[] = [
                'tanggal' => formatTanggal($k->transaksi?->tanggal, $zonaWaktuPengguna),
                'pengguna' => $k->transaksi?->user?->name,
                'nominal' => "Rp. " . rupiah($k->nominal),
                'keterangan' => $k->keterangan,
            ];
        }

        if ($simpananAnggota) {
            return response()->json([
                'nama' => $simpananAnggota->anggota?->nama,
                'alamat' => $simpananAnggota->anggota?->alamat,
                'nominal' => $simpananAnggota->nominal,
                'rupiah' => "Rp. " . rupiah($simpananAnggota->nominal),
                'riwayat' => $riwayat,
            ], 200);
        } else {
            return response()->json(404);
        }
        
    }
    public function pengambilanPoin(Request $request)
    {
        $request->validate([
            'toko' => ['required', 'uuid'],
            'anggota' => ['required', 'uuid'],
            'nominalPengambilanPoin' => ['required', 'numeric'],
        ]);
        $transfer = [
            'toko' => $request->toko,
            'anggota' => $request->anggota,
            'total' => $request->nominalPengambilanPoin,
            'tipe' => TipeTransaksi::PENGAMBILAN_POIN,
            'status' => StatusTransfer::MENUNGGU,
        ];
        // tabungan yang ditambah
        $tabungan = $request->tabunganYangDigunakan ?? $this->pengaturan->getWhereOne(['id', 'tabungan_id'], ['toko_id' => $request->toko, 'tipe' => TipePengaturan::TUNAI])->tabungan_id;

        $transferDetail[] = [
            'tabungan' => $tabungan,
            'nominal' => $request->nominalPengambilanPoin,
            'tipe' => TipeTransaksiDetail::MENGURANGI,
            'keterangan' => KeteranganTransferDetail::NOMINAL_PENARIKAN,
        ];
        if ($this->transfer->saveTransfer($transfer, $transferDetail)) {
            $this->tabungan->updateNominal([
                'tipe' => 'mengurangi',
                'tabungan' => $tabungan,
                'nominal' => $request->nominalPengambilanPoin,
            ]);
            $this->anggota->updatePoin([
                'anggota' => $request->anggota,
                'aksi' => 'mengurangi',
                'nominal' => $request->nominalPengambilanPoin,
            ]);
            return response()->json(['pesan' => 'Pengambilan poin berhasil disimpan'], 200);
        } else {
            return response()->json(404);
        }
    }
    public function daftarTabunganAnggota(DataAnggotaRequest $request)
    {
        return response()->json($this->anggota->gatAllData($request, ['simpanan' => TipeSimpananAnggota::TABUNGAN]), 200);
    }
}
