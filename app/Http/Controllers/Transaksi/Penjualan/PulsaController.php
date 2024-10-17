<?php

namespace App\Http\Controllers\Transaksi\Penjualan;

use App\Enums\KeteranganTransferDetail;
use App\Enums\StatusTransfer;
use App\Enums\TipePengaturan;
use App\Enums\TipeTransaksi;
use App\Enums\TipeTransaksiDetail;
use App\Http\Controllers\Controller;
use App\Http\Requests\Transaksi\PulsaRequest;
use App\Services\Master\PaketService;
use App\Services\Master\TabunganService;
use App\Services\Master\TokoService;
use App\Services\PengaturanService;
use App\Services\TransferService;

class PulsaController extends Controller
{
    public function __construct(
        protected TokoService $toko,
        protected TransferService $transfer,
        protected TabunganService $tabungan,
        protected PengaturanService $pengaturan,
        protected PaketService $paket,
    ) {}
    public function simpan(PulsaRequest $request)
    {
        // transfer detail
        // tabungan yang dikurangi
        $transferDetail[] = [
            'tabungan' => $request->tabungan,
            'nominal' => $request->hargaBeli,
            'tipe' => TipeTransaksiDetail::MENGURANGI,
            'keterangan' => KeteranganTransferDetail::NOMINAL_TRANSFER,
        ];
        // tabungan yang ditambahkan uang tunai
        $pengaturanTunai = $this->pengaturan->getWhereOne(['id', 'tabungan_id'], ['toko_id' => $request->toko, 'tipe' => TipePengaturan::TUNAI]);
        $transferDetail[] = [
            'tabungan' => $pengaturanTunai->tabungan_id,
            'nominal' => $request->hargaBeli,
            'tipe' => TipeTransaksiDetail::MENAMBAH,
            'keterangan' => KeteranganTransferDetail::NOMINAL_TRANSFER,
        ];
        $transferDetail[] = [
            'tabungan' => $pengaturanTunai->tabungan_id,
            'nominal' => $request->hargaJual - $request->hargaBeli,
            'tipe' => TipeTransaksiDetail::MENAMBAH,
            'keterangan' => KeteranganTransferDetail::BIAYA_ADMIN,
        ];
        // transfer
        $transfer = [
            'toko' => $request->toko,
            'anggota' => null,
            'total' => $request->hargaJual,
            'tipe' => TipeTransaksi::PENJUALAN_PULSA,
            'status' => StatusTransfer::MENUNGGU,
        ];
        if ($this->transfer->saveTransfer($transfer, $transferDetail)) {
            $this->tabungan->updateNominal([
                'tipe' => 'mengurangi',
                'tabungan' => $request->tabungan,
                'nominal' => $request->hargaBeli,
            ]);
            $this->tabungan->updateNominal([
                'tipe' => 'menambahkan',
                'tabungan' => $pengaturanTunai->tabungan_id,
                'nominal' => $request->hargaJual,
            ]);
            return back()->with('success', 'Penjualan pulsa berhasil disimpan');
        } else {
            return back()->with('error', 'Terjadi kesalahan pada saat penyimpanan data');
        }
    }
}
