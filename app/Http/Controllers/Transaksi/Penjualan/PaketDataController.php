<?php

namespace App\Http\Controllers\Transaksi\Penjualan;

use App\Enums\KeteranganTransferDetail;
use App\Enums\StatusTransfer;
use App\Enums\TipePengaturan;
use App\Enums\TipeTransaksi;
use App\Enums\TipeTransaksiDetail;
use App\Http\Controllers\Controller;
use App\Http\Requests\Transaksi\PaketDataRequest;
use App\Services\Master\TabunganService;
use App\Services\Master\TokoService;
use App\Services\PengaturanService;
use App\Services\TransferService;

class PaketDataController extends Controller
{
    public function __construct(
        protected TokoService $toko,
        protected TransferService $transfer,
        protected TabunganService $tabungan,
        protected PengaturanService $pengaturan,
    ) {}
    public function simpan(PaketDataRequest $request)
    {
        if ($request->hargaBeli > $request->hargaJual) {
            return to_route('transaksi.penjualan.paket-data.index')->with('error', 'Harga beli lebih dari harga jual');
        }
        // transfer deatil
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
            'tipe' => TipeTransaksi::PENJUALAN_PAKET_DATA,
            'status' => StatusTransfer::MENUNGGU,
            'keterangan' => $request->keterangan,
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
            return back()->with('success', 'Penjualan paket data berhasil disimpan');
        } else {
            return back()->with('error', 'Terjadi kesalahan pada saat penyimpanan data');
        }
    }
}
