<?php

namespace App\Http\Controllers\Transaksi\Transfer;

use App\Enums\KeteranganTransferDetail;
use App\Enums\StatusTransfer;
use App\Enums\TipePengaturan;
use App\Enums\TipeTransaksi;
use App\Enums\TipeTransaksiDetail;
use App\Http\Controllers\Controller;
use App\Http\Requests\Transaksi\InvestasiSetorRequest;
use App\Services\Master\AnggotaService;
use App\Services\Master\TabunganService;
use App\Services\PengaturanService;
use App\Services\TransferService;

class InvestasiController extends Controller
{

    public function __construct(
        protected PengaturanService $pengaturan,
        protected TransferService $transfer,
        protected TabunganService $tabungan,
        protected AnggotaService $anggota,
    ) {}
    public function setor(InvestasiSetorRequest $request)
    {
        $transfer = [
            'toko' => $request->toko,
            'anggota' => $request->anggota,
            'total' => $request->nominalInvestasi,
            'tipe' => TipeTransaksi::INVESTASI,
            'status' => StatusTransfer::MENUNGGU,
        ];
        // tabungan yang ditambah
        $tabungan = $request->tabunganYangDigunakan ?? $this->pengaturan->getWhereOne(['id', 'tabungan_id'], ['toko_id' => $request->toko, 'tipe' => TipePengaturan::TUNAI])->tabungan_id;

        $transferDetail[] = [
            'tabungan' => $tabungan,
            'nominal' => $request->nominalInvestasi,
            'tipe' => TipeTransaksiDetail::MENAMBAH,
            'keterangan' => KeteranganTransferDetail::NOMINAL_SETORAN,
        ];
        if ($this->transfer->saveTransfer($transfer, $transferDetail)) {
            $this->tabungan->updateNominal([
                'tipe' => 'menambahkan',
                'tabungan' => $tabungan,
                'nominal' => $request->nominalInvestasi,
            ]);
            $this->anggota->updateOrCreateSimpanan([
                'anggota' => $request->anggota,
                'tipe' => TipeTransaksi::INVESTASI,
                'aksi' => 'menambahkan',
                'nominal' => $request->nominalInvestasi,
            ]);
            return back()->with('success', 'Investasi berhasil disimpan');
        } else {
            return back()->with('error', 'Terjadi kesalahan pada saat penyimpanan data');
        }
    }
}
