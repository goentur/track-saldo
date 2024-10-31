<?php

namespace App\Http\Controllers\Transaksi\Transfer;

use App\Enums\KeteranganTransferDetail;
use App\Enums\StatusTransfer;
use App\Enums\TipeTransaksi;
use App\Enums\TipeTransaksiDetail;
use App\Http\Controllers\Controller;
use App\Http\Requests\Transaksi\Pinjam\MeminjamkanRequest;
use App\Http\Requests\Transaksi\Pinjam\PinjamRequest;
use App\Services\Master\TabunganService;
use App\Services\Master\TokoService;
use App\Services\PengaturanService;
use App\Services\TransferService;

class PinjamController extends Controller
{
    public function __construct(
        protected TokoService $toko,
        protected TransferService $transfer,
        protected TabunganService $tabungan,
        protected PengaturanService $pengaturan,
    ) {}
    public function meminjamkan(MeminjamkanRequest $request)
    {
        // transfer deatil
        $nominal = $request->nominal;
        if ($request->biayaTransfer) {
            $transferDetail[] = [
                'tabungan' => $request->tabungan,
                'nominal' => $request->biayaTransfer,
                'tipe' => TipeTransaksiDetail::MENGURANGI,
                'keterangan' => KeteranganTransferDetail::BIAYA_TRANSFER,
            ];
            $nominal = $request->nominal + $request->biayaTransfer;
        }
        // tabungan yang dikurangi
        $transferDetail[] = [
            'tabungan' => $request->tabungan,
            'nominal' => $request->nominal,
            'tipe' => TipeTransaksiDetail::MENGURANGI,
            'keterangan' => KeteranganTransferDetail::NOMINAL_TRANSFER,
        ];
        // transfer
        $transfer = [
            'toko' => $request->toko,
            'anggota' => $request->anggota,
            'total' => $nominal,
            'tipe' => TipeTransaksi::MEMINJAMKAN,
            'status' => StatusTransfer::MENUNGGU,
            'keterangan' => $request->keterangan,
        ];
        if ($this->transfer->saveTransfer($transfer, $transferDetail)) {
            $this->tabungan->updateNominal([
                'tipe' => 'mengurangi',
                'tabungan' => $request->tabungan,
                'nominal' => $nominal,
            ]);
            return response()->json(['message' => 'Meminjamkan berhasil disimpan'], 200);
        } else {
            return response()->json(['message' => 'Terjadi kesalahan pada saat penyimpanan data'], 422);
        }
    }
    public function pinjam(PinjamRequest $request)
    {
        // tabungan yang dikurangi
        $transferDetail[] = [
            'tabungan' => $request->tabungan,
            'nominal' => $request->nominal,
            'tipe' => TipeTransaksiDetail::MENAMBAH,
            'keterangan' => KeteranganTransferDetail::NOMINAL_TRANSFER,
        ];
        // transfer
        $transfer = [
            'toko' => $request->toko,
            'anggota' => $request->anggota,
            'total' => $request->nominal,
            'tipe' => TipeTransaksi::PINJAM,
            'status' => StatusTransfer::MENUNGGU,
            'keterangan' => $request->keterangan,
        ];
        if ($this->transfer->saveTransfer($transfer, $transferDetail)) {
            $this->tabungan->updateNominal([
                'tipe' => 'menambahkan',
                'tabungan' => $request->tabungan,
                'nominal' => $request->nominal,
            ]);
            return response()->json(['message' => 'Pinjam berhasil disimpan'], 200);
        } else {
            return response()->json(['message' => 'Terjadi kesalahan pada saat penyimpanan data'], 422);
        }
    }
}
