<?php

namespace App\Http\Controllers\Transaksi\Transfer;

use App\Enums\KeteranganTransferDetail;
use App\Enums\StatusTransfer;
use App\Enums\TipePengaturan;
use App\Enums\TipeTransaksi;
use App\Enums\TipeTransaksiDetail;
use App\Http\Controllers\Controller;
use App\Http\Requests\Transaksi\ViaATMNasabahRequest;
use App\Services\Master\AnggotaService;
use App\Services\Master\TabunganService;
use App\Services\Master\TokoService;
use App\Services\PengaturanService;
use App\Services\TransferService;

class ViaATMNasabahController extends Controller
{
    public function __construct(
        protected PengaturanService $pengaturan,
        protected TokoService $toko,
        protected TransferService $transfer,
        protected TabunganService $tabungan,
        protected AnggotaService $anggota,
    ) {}
    public function simpan(ViaATMNasabahRequest $request)
    {
        if ($request->tabunganBiayaAdmin) {
            $tabungan = $request->tabunganBiayaAdmin;
        } else {
            $pengaturanTunai = $this->pengaturan->getWhereOne(['id', 'tabungan_id'], ['toko_id' => $request->toko, 'tipe' => TipePengaturan::TUNAI]);
            $tabungan = $pengaturanTunai->tabungan_id;
        }
        $transfer = [
            'toko' => $request->toko,
            'anggota' => $request->anggota,
            'total' => $request->nominalBiayaAdmin,
            'tipe' => TipeTransaksi::TRANSFER_VIA_ATM_NASABAH,
            'status' => StatusTransfer::MENUNGGU,
        ];
        $transferDetail[] = [
            'tabungan' => $tabungan,
            'nominal' => $request->nominalBiayaAdmin,
            'tipe' => TipeTransaksiDetail::MENAMBAH,
            'keterangan' => KeteranganTransferDetail::BIAYA_ADMIN,
        ];
        if ($this->transfer->saveTransfer($transfer, $transferDetail)) {
            $this->tabungan->updateNominal([
                'tipe' => 'menambahkan',
                'tabungan' => $tabungan,
                'nominal' => $request->nominalBiayaAdmin,
            ]);
            if ($request->anggota) {
                $this->anggota->updatePoin([
                    'anggota' => $request->anggota,
                    'aksi' => 'menambahkan',
                    'nominal' => $request->nominalBiayaAdmin,
                ]);
            }
            return back()->with('success', 'Transfer via ATM nasabah berhasil disimpan');
        } else {
            return back()->with('error', 'Terjadi kesalahan pada saat penyimpanan data');
        }
    }
}
