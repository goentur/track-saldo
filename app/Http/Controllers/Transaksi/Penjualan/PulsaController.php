<?php

namespace App\Http\Controllers\Transaksi\Penjualan;

use App\Enums\KeteranganTransferDetail;
use App\Enums\StatusTransfer;
use App\Enums\TipePengaturan;
use App\Enums\TipeTransfer;
use App\Enums\TipeTransferDetail;
use App\Http\Controllers\Controller;
use App\Http\Requests\Transaksi\PulsaRequest;
use App\Models\Pengaturan;
use App\Models\PengaturanNominal;
use App\Services\Master\PaketService;
use App\Services\Master\TabunganService;
use App\Services\Master\TokoService;
use App\Services\PengaturanNominalService;
use App\Services\PengaturanService;
use App\Services\TransferService;

class PulsaController extends Controller
{
    public function __construct(
        protected TokoService $toko,
        protected TransferService $transfer,
        protected TabunganService $tabungan,
        protected PengaturanService $pengaturan,
        protected PengaturanNominalService $pengaturanNominal,
        protected PaketService $paket,
    ) {
    }
    public function index()
    {
        return inertia('Transaksi/Penjualan/Pulsa/Index', [
            'tokos' => $this->toko->get(['id', 'nama']),
        ]);
    }
    public function simpan(PulsaRequest $request)
    {
        $paketPulsa = $this->paket->find($request->paketPulsa);
        if ($request->hargaBeli > $paketPulsa->harga) {
            return to_route('transaksi.penjualan.pulsa.index')->with('error', 'Harga beli lebih dari harga paket pulsa');
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
            'nominal' => $paketPulsa->harga - $request->hargaBeli,
            'tipe' => TipeTransferDetail::MENAMBAH,
            'keterangan' => KeteranganTransferDetail::BIAYA_ADMIN,
        ];
        // transfer
        $transfer = [
            'anggota' => null,
            'total' => $paketPulsa->harga,
            'tipe' => TipeTransfer::PENJUALAN_PULSA,
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
                'nominal' => $paketPulsa->harga,
            ]);
            return to_route('transaksi.menu')->with('success', 'Penjualan pulsa berhasil disimpan');
        } else {
            return to_route('transaksi.penjualan.pulsa.index')->with('error', 'Terjadi kesalahan pada saat penyimpanan data');
        }
    }
}
