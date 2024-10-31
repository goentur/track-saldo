<?php

namespace App\Http\Controllers\Transaksi\Transfer;

use App\Enums\KeteranganTransferDetail;
use App\Enums\StatusTransfer;
use App\Enums\TipePengaturan;
use App\Enums\TipeTransaksi;
use App\Enums\TipeTransaksiDetail;
use App\Http\Controllers\Controller;
use App\Http\Requests\Transaksi\TunaiRequest;
use App\Services\Master\AnggotaService;
use App\Services\Master\TabunganService;
use App\Services\Master\TokoService;
use App\Services\PengaturanService;
use App\Services\TransferService;

class TunaiController extends Controller
{
    public function __construct(
        protected PengaturanService $pengaturan,
        protected TokoService $toko,
        protected TransferService $transfer,
        protected TabunganService $tabungan,
        protected AnggotaService $anggota,
    ) {}
    public function simpan(TunaiRequest $request)
    {
        // transfer deatil
        $nominalBiayaYangDigunakan = $request->nominalBiayaYangDigunakan;
        if ($request->biayaTransfer) {
            $transferDetail[] = [
                'tabungan' => $request->tabunganYangDigunakan,
                'nominal' => $request->biayaTransfer,
                'tipe' => TipeTransaksiDetail::MENGURANGI,
                'keterangan' => KeteranganTransferDetail::BIAYA_TRANSFER,
            ];
            $nominalBiayaYangDigunakan = $request->nominalBiayaYangDigunakan + $request->biayaTransfer;
        }
        // tabungan yang dikurangi
        $transferDetail[] = [
            'tabungan' => $request->tabunganYangDigunakan,
            'nominal' => $nominalBiayaYangDigunakan,
            'tipe' => TipeTransaksiDetail::MENGURANGI,
            'keterangan' => KeteranganTransferDetail::NOMINAL_TRANSFER,
        ];
        // tabungan yang ditambah
        // penagturan uang tunai
        $pengaturanTunai = $this->pengaturan->getWhereOne(['id', 'tabungan_id'], ['toko_id' => $request->toko, 'tipe' => TipePengaturan::TUNAI]);
        $transferDetail[] = [
            'tabungan' => $pengaturanTunai->tabungan_id,
            'nominal' => $request->nominalBiayaYangDigunakan,
            'tipe' => TipeTransaksiDetail::MENAMBAH,
            'keterangan' => KeteranganTransferDetail::NOMINAL_TRANSFER,
        ];
        // tabungan yang diambil jika tabunganBiayaAdmin null maka otomatis menggunakan pengaturan tunai
        $tabungan = $pengaturanTunai->tabungan_id;
        if ($request->tabunganBiayaAdmin) {
            $tabungan = $request->tabunganBiayaAdmin;
        }
        $transferDetail[] = [
            'tabungan' => $tabungan,
            'nominal' => $request->nominalBiayaAdmin,
            'tipe' => TipeTransaksiDetail::MENAMBAH,
            'keterangan' => KeteranganTransferDetail::BIAYA_ADMIN,
        ];
        $transfer = [
            'toko' => $request->toko,
            'anggota' => $request->anggota,
            'total' => $nominalBiayaYangDigunakan + $request->nominalBiayaAdmin,
            'tipe' => TipeTransaksi::TRANSFER_TUNIA,
            'status' => StatusTransfer::MENUNGGU,
            'keterangan' => $request->keterangan,
        ];
        if ($this->transfer->saveTransfer($transfer, $transferDetail)) {
            $this->tabungan->updateNominal([
                'tipe' => 'mengurangi',
                'tabungan' => $request->tabunganYangDigunakan,
                'nominal' => $nominalBiayaYangDigunakan,
            ]);
            $this->tabungan->updateNominal([
                'tipe' => 'menambahkan',
                'tabungan' => $pengaturanTunai->tabungan_id,
                'nominal' => $request->nominalBiayaYangDigunakan,
            ]);
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
            return response()->json(['message' => 'Transfer Tunai berhasil disimpan'], 200);
        } else {
            return response()->json(['message' => 'Terjadi kesalahan pada saat penyimpanan data'], 422);
        }
    }
}
