<?php

namespace App\Http\Controllers\Transaksi\Penjualan;

use App\Enums\KeteranganTransferDetail;
use App\Enums\StatusTransfer;
use App\Enums\TipePengaturan;
use App\Enums\TipeTransfer;
use App\Enums\TipeTransferDetail;
use App\Http\Controllers\Controller;
use App\Http\Requests\Transaksi\PaketDataRequest;
use App\Services\Master\TabunganService;
use App\Services\Master\TokoService;
use App\Services\PengaturanNominalService;
use App\Services\PengaturanService;
use App\Services\TransferService;

class PaketDataController extends Controller
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
        return inertia('Transaksi/Penjualan/PaketData/Index', [
            'tokos' => $this->toko->get(['id', 'nama']),
        ]);
    }
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
            'tipe' => TipeTransferDetail::MENGURANGI,
            'keterangan' => KeteranganTransferDetail::NOMINAL_TRANSFER,
        ];
        // tabungan yang ditambahkan uang tunai
        $pengaturanTunai = $this->pengaturan->getWhereOne(['id', 'tabungan_id'], ['toko_id' => $request->toko, 'tipe' => TipePengaturan::TUNAI]);
        $transferDetail[] = [
            'tabungan' => $pengaturanTunai->tabungan_id,
            'nominal' => $request->hargaBeli,
            'tipe' => TipeTransferDetail::MENAMBAH,
            'keterangan' => KeteranganTransferDetail::NOMINAL_TRANSFER,
        ];
        $transferDetail[] = [
            'tabungan' => $pengaturanTunai->tabungan_id,
            'nominal' => $request->hargaJual - $request->hargaBeli,
            'tipe' => TipeTransferDetail::MENAMBAH,
            'keterangan' => KeteranganTransferDetail::BIAYA_ADMIN,
        ];
        // transfer
        $transfer = [
            'anggota' => null,
            'total' => $request->hargaJual,
            'tipe' => TipeTransfer::PENJUALAN_PAKET_DATA,
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
            return to_route('transaksi.menu')->with('success', 'Penjualan paket data berhasil disimpan');
        } else {
            return to_route('transaksi.penjualan.paket-data.index')->with('error', 'Terjadi kesalahan pada saat penyimpanan data');
        }
    }
}
