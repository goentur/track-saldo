<?php

namespace App\Http\Controllers\Transaksi\Transfer;

use App\Enums\KeteranganTransferDetail;
use App\Enums\StatusTransfer;
use App\Enums\TipeTransaksi;
use App\Enums\TipeTransaksiDetail;
use App\Http\Controllers\Controller;
use App\Http\Requests\Transaksi\MutasiSaldoRequest;
use App\Services\Master\TabunganService;
use App\Services\Master\TokoService;
use App\Services\PengaturanService;
use App\Services\TransferService;

class MutasiSaldoController extends Controller
{
    public function __construct(
        protected TokoService $toko,
        protected TransferService $transfer,
        protected TabunganService $tabungan,
        protected PengaturanService $pengaturan,
    ) {}
    public function simpan(MutasiSaldoRequest $request)
    {
        // transfer deatil
        $nominal = $request->nominal;
        if ($request->biayaTransfer) {
            $transferDetail[] = [
                'tabungan' => $request->tabunganDari,
                'nominal' => $request->biayaTransfer,
                'tipe' => TipeTransaksiDetail::MENGURANGI,
                'keterangan' => KeteranganTransferDetail::BIAYA_TRANSFER,
            ];
            $nominal = $request->nominal + $request->biayaTransfer;
        }
        // tabungan yang dikurangi
        $transferDetail[] = [
            'tabungan' => $request->tabunganDari,
            'nominal' => $request->nominal,
            'tipe' => TipeTransaksiDetail::MENGURANGI,
            'keterangan' => KeteranganTransferDetail::NOMINAL_TRANSFER,
        ];
        // tabungan yang ditambahkan
        $transferDetail[] = [
            'tabungan' => $request->tabunganKe,
            'nominal' => $request->nominal,
            'tipe' => TipeTransaksiDetail::MENAMBAH,
            'keterangan' => KeteranganTransferDetail::NOMINAL_TRANSFER,
        ];
        // transfer
        $transfer = [
            'toko' => $request->toko,
            'anggota' => null,
            'total' => $nominal,
            'tipe' => TipeTransaksi::MUTASI_SALDO,
            'status' => StatusTransfer::MENUNGGU,
        ];
        if ($this->transfer->saveTransfer($transfer, $transferDetail)) {
            $this->tabungan->updateNominal([
                'tipe' => 'mengurangi',
                'tabungan' => $request->tabunganDari,
                'nominal' => $nominal,
            ]);
            $this->tabungan->updateNominal([
                'tipe' => 'menambahkan',
                'tabungan' => $request->tabunganKe,
                'nominal' => $request->nominal,
            ]);
            return back()->with('success', 'Mutasi saldo berhasil disimpan');
        } else {
            return back()->with('error', 'Terjadi kesalahan pada saat penyimpanan data');
        }
    }
}
