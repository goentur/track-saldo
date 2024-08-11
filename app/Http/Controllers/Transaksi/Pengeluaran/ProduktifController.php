<?php

namespace App\Http\Controllers\Transaksi\Pengeluaran;

use App\Enums\KeteranganTransferDetail;
use App\Enums\StatusTransfer;
use App\Enums\TipePengaturanNominal;
use App\Enums\TipeTransaksi;
use App\Enums\TipeTransaksiDetail;
use App\Http\Controllers\Controller;
use App\Http\Requests\Transaksi\ProduktifRequest;
use App\Services\Master\TabunganService;
use App\Services\Master\TokoService;
use App\Services\PengaturanNominalService;
use App\Services\PengaturanService;
use App\Services\TransferService;

class ProduktifController extends Controller
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
        return inertia('Transaksi/Pengeluaran/Produktif/Index', [
            'tokos' => $this->toko->getTokosByUser(['id', 'nama']),
        ]);
    }
    public function simpan(ProduktifRequest $request)
    {
        $nominal = $request->nominal;
        if ($request->biayaTransfer) {
            $pengaturanBiayaTransfer = $this->pengaturanNominal->getWhereOne(['id', 'nominal'], ['toko_id' => $request->toko, 'tipe' => TipePengaturanNominal::BIAYA_TRANSFER]);
            $transferDetail[] = [
                'tabungan' => $request->tabungan,
                'nominal' => $pengaturanBiayaTransfer->nominal,
                'tipe' => TipeTransaksiDetail::MENGURANGI,
                'keterangan' => KeteranganTransferDetail::BIAYA_TRANSFER,
            ];
            $nominal = $request->nominal + $pengaturanBiayaTransfer->nominal;
        }
        $transferDetail[] = [
            'tabungan' => $request->tabungan,
            'nominal' => $nominal,
            'tipe' => TipeTransaksiDetail::MENGURANGI,
            'keterangan' => KeteranganTransferDetail::NOMINAL_PENGELUARAN,
        ];
        // transfer
        $transfer = [
            'toko' => $request->toko,
            'anggota' => null,
            'total' => $nominal,
            'tipe' => TipeTransaksi::PRODUKTIF,
            'status' => StatusTransfer::MENUNGGU,
        ];
        if ($this->transfer->saveTransfer($transfer, $transferDetail)) {
            $this->tabungan->updateNominal([
                'tipe' => 'mengurangi',
                'tabungan' => $request->tabungan,
                'nominal' => $nominal,
            ]);
            return to_route('transaksi.menu')->with('success', 'Transfer berhasil disimpan');
        } else {
            return to_route('transaksi.transfer.mutasi-saldo.index')->with('error', 'Terjadi kesalahan pada saat penyimpanan data');
        }
    }
}
