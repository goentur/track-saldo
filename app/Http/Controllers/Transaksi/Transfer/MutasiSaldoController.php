<?php

namespace App\Http\Controllers\Transaksi\Transfer;

use App\Enums\KeteranganTransferDetail;
use App\Enums\StatusTransfer;
use App\Enums\TipePengaturanNominal;
use App\Enums\TipeTransfer;
use App\Enums\TipeTransferDetail;
use App\Http\Controllers\Controller;
use App\Http\Requests\Transaksi\MutasiSaldoRequest;
use App\Services\Master\TabunganService;
use App\Services\Master\TokoService;
use App\Services\PengaturanNominalService;
use App\Services\PengaturanService;
use App\Services\TransferService;

class MutasiSaldoController extends Controller
{
    public function __construct(
        protected TokoService $toko,
        protected TransferService $transfer,
        protected TabunganService $tabungan,
        protected PengaturanService $pengaturan,
        protected PengaturanNominalService $pengaturanNominal,
    ) {
    }
    public function index()
    {
        return inertia('Transaksi/Transfer/MutasiSaldo/Index', [
            'tokos' => $this->toko->get(['id', 'nama']),
        ]);
    }
    public function simpan(MutasiSaldoRequest $request)
    {
        // transfer deatil
        $nominal = $request->nominal;
        if ($request->biayaTransfer) {
            $pengaturanBiayaTransfer = $this->pengaturanNominal->getWhereOne(['id', 'nominal'], ['toko_id' => $request->toko, 'tipe' => TipePengaturanNominal::BIAYA_TRANSFER]);
            $transferDetail[] = [
                'tabungan' => $request->tabunganDari,
                'nominal' => $pengaturanBiayaTransfer->nominal,
                'tipe' => TipeTransferDetail::MENGURANGI,
                'keterangan' => KeteranganTransferDetail::BIAYA_TRANSFER,
            ];
            $nominal = $request->nominal + $pengaturanBiayaTransfer->nominal;
        }
        // tabungan yang dikurangi
        $transferDetail[] = [
            'tabungan' => $request->tabunganDari,
            'nominal' => $nominal,
            'tipe' => TipeTransferDetail::MENGURANGI,
            'keterangan' => KeteranganTransferDetail::NOMINAL_TRANSFER,
        ];
        // tabungan yang ditambahkan
        $transferDetail[] = [
            'tabungan' => $request->tabunganKe,
            'nominal' => $nominal,
            'tipe' => TipeTransferDetail::MENAMBAH,
            'keterangan' => KeteranganTransferDetail::NOMINAL_TRANSFER,
        ];
        // transfer
        $transfer = [
            'anggota' => null,
            'total' => $nominal,
            'tipe' => TipeTransfer::MUTASI_SALDO,
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
            return to_route('transaksi.menu')->with('success', 'Transfer berhasil disimpan');
        } else {
            return to_route('transaksi.transfer.mutasi-saldo.index')->with('error', 'Terjadi kesalahan pada saat penyimpanan data');
        }
    }
}
