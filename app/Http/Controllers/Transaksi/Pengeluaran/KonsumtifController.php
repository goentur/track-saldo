<?php

namespace App\Http\Controllers\Transaksi\Pengeluaran;

use App\Enums\KeteranganTransferDetail;
use App\Enums\StatusTransfer;
use App\Enums\TipePengaturan;
use App\Enums\TipePengaturanNominal;
use App\Enums\TipeTransaksi;
use App\Enums\TipeTransaksiDetail;
use App\Http\Controllers\Controller;
use App\Http\Requests\Transaksi\KonsumtifRequest;
use App\Services\Master\TabunganService;
use App\Services\Master\TokoService;
use App\Services\PengaturanNominalService;
use App\Services\PengaturanService;
use App\Services\TransferService;

class KonsumtifController extends Controller
{
    public function __construct(
        protected TokoService $toko,
        protected TransferService $transfer,
        protected TabunganService $tabungan,
        protected PengaturanService $pengaturan,
        protected PengaturanNominalService $pengaturanNominal,
    ) {}
    public function index()
    {
        return inertia('Transaksi/Pengeluaran/Konsumtif/Index', [
            'tokos' => $this->toko->getTokosByUser(['id', 'nama']),
        ]);
    }
    public function simpan(KonsumtifRequest $request)
    {
        $nominal = $request->nominal;
        if ($request->tabungan) {
            $tabungan = $request->tabungan;
            if ($request->biayaTransfer) {
                $pengaturanBiayaTransfer = $this->pengaturanNominal->getWhereOne(['id', 'nominal'], ['toko_id' => $request->toko, 'tipe' => TipePengaturanNominal::BIAYA_TRANSFER]);
                $transferDetail[] = [
                    'tabungan' => $tabungan,
                    'nominal' => $pengaturanBiayaTransfer->nominal,
                    'tipe' => TipeTransaksiDetail::MENGURANGI,
                    'keterangan' => KeteranganTransferDetail::BIAYA_TRANSFER,
                ];
                $nominal = $request->nominal + $pengaturanBiayaTransfer->nominal;
            }
        } else {
            $pengaturanTunai = $this->pengaturan->getWhereOne(['id', 'tabungan_id'], ['toko_id' => $request->toko, 'tipe' => TipePengaturan::TUNAI]);
            $tabungan = $pengaturanTunai->tabungan_id;
        }
        $transferDetail[] = [
            'tabungan' => $tabungan,
            'nominal' => $nominal,
            'tipe' => TipeTransaksiDetail::MENGURANGI,
            'keterangan' => KeteranganTransferDetail::NOMINAL_PENGELUARAN,
        ];
        // transfer
        $transfer = [
            'toko' => $request->toko,
            'anggota' => null,
            'total' => $nominal,
            'tipe' => TipeTransaksi::KONSUMTIF,
            'status' => StatusTransfer::MENUNGGU,
        ];
        if ($this->transfer->saveTransfer($transfer, $transferDetail)) {
            $this->tabungan->updateNominal([
                'tipe' => 'mengurangi',
                'tabungan' => $tabungan,
                'nominal' => $nominal,
            ]);
            return to_route('transaksi.menu')->with('success', 'Transfer berhasil disimpan');
        } else {
            return to_route('transaksi.transfer.mutasi-saldo.index')->with('error', 'Terjadi kesalahan pada saat penyimpanan data');
        }
    }
}
