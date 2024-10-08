<?php

namespace App\Http\Controllers\Transaksi\Transfer;

use App\Enums\KeteranganTransferDetail;
use App\Enums\StatusTransfer;
use App\Enums\TipePengaturan;
use App\Enums\TipeTransaksi;
use App\Enums\TipeTransaksiDetail;
use App\Http\Controllers\Controller;
use App\Http\Requests\Transaksi\TarikTunaiRequest;
use App\Services\Master\AnggotaService;
use App\Services\Master\TabunganService;
use App\Services\Master\TokoService;
use App\Services\PengaturanService;
use App\Services\TransferService;

class TarikTunaiController extends Controller
{
    public function __construct(
        protected PengaturanService $pengaturan,
        protected TokoService $toko,
        protected TransferService $transfer,
        protected TabunganService $tabungan,
        protected AnggotaService $anggota,
    ) {
    }
    public function index()
    {
        return inertia('Transaksi/Transfer/TarikTunai/Index', [
            'tokos' => $this->toko->getTokosByUser(['id', 'nama']),
        ]);
    }
    public function simpan(TarikTunaiRequest $request)
    {
        $transfer = [
            'toko' => $request->toko,
            'anggota' => $request->anggota,
            'total' => $request->nominalBiayaYangDigunakan + $request->nominalBiayaAdmin,
            'tipe' => TipeTransaksi::TARIK_TUNAI,
            'status' => StatusTransfer::MENUNGGU,
        ];
        // tabungan yang ditambah
        $transferDetail[] = [
            'tabungan' => $request->tabunganYangDigunakan,
            'nominal' => $request->nominalBiayaYangDigunakan,
            'tipe' => TipeTransaksiDetail::MENAMBAH,
            'keterangan' => KeteranganTransferDetail::NOMINAL_TRANSFER,
        ];
        $pengaturanTunai = $this->pengaturan->getWhereOne(['id', 'tabungan_id'], ['toko_id' => $request->toko, 'tipe' => TipePengaturan::TUNAI]);
        // tabungan yang dikurangi
        $transferDetail[] = [
            'tabungan' => $pengaturanTunai->tabungan_id,
            'nominal' => $request->nominalBiayaYangDigunakan,
            'tipe' => TipeTransaksiDetail::MENGURANGI,
            'keterangan' => KeteranganTransferDetail::NOMINAL_TRANSFER,
        ];
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
        if ($this->transfer->saveTransfer($transfer, $transferDetail)) {
            $this->tabungan->updateNominal([
                'tipe' => 'menambahkan',
                'tabungan' => $request->tabunganYangDigunakan,
                'nominal' => $request->nominalBiayaYangDigunakan,
            ]);
            $this->tabungan->updateNominal([
                'tipe' => 'mengurangi',
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
                    'nominal' => $request->nominalBiayaAdmin,
                ]);
            }
            return to_route('transaksi.menu')->with('success', 'Transfer berhasil disimpan');
        } else {
            return to_route('transaksi.transfer.tarik-tunai.index')->with('error', 'Terjadi kesalahan pada saat penyimpanan data');
        }
    }
}
