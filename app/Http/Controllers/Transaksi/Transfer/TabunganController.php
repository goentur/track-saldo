<?php

namespace App\Http\Controllers\Transaksi\Transfer;

use App\Enums\KeteranganTransferDetail;
use App\Enums\StatusTransfer;
use App\Enums\TipePengaturan;
use App\Enums\TipeTransaksi;
use App\Enums\TipeTransaksiDetail;
use App\Http\Controllers\Controller;
use App\Http\Requests\Transaksi\TabunganSetorRequest;
use App\Http\Requests\Transaksi\TabunganTarikRequest;
use App\Services\Master\AnggotaService;
use App\Services\Master\TabunganService;
use App\Services\PengaturanService;
use App\Services\TransferService;

class TabunganController extends Controller
{
    public function __construct(
        protected PengaturanService $pengaturan,
        protected TransferService $transfer,
        protected TabunganService $tabungan,
        protected AnggotaService $anggota,
    ) {}
    public function setor(TabunganSetorRequest $request)
    {
        $transfer = [
            'toko' => $request->toko,
            'anggota' => $request->anggota,
            'total' => $request->nominalTabungan,
            'tipe' => TipeTransaksi::TABUNGAN,
            'status' => StatusTransfer::MENUNGGU,
            'keterangan' => $request->keterangan,
        ];
        // tabungan yang ditambah
        $pengaturanTunai = $this->pengaturan->getWhereOne(['id', 'tabungan_id'], ['toko_id' => $request->toko, 'tipe' => TipePengaturan::TUNAI]);
        $tabungan = $pengaturanTunai->tabungan_id;
        if ($request->tabunganYangDigunakan) {
            $tabungan = $request->tabunganYangDigunakan;
        }
        $transferDetail[] = [
            'tabungan' => $tabungan,
            'nominal' => $request->nominalTabungan,
            'tipe' => TipeTransaksiDetail::MENAMBAH,
            'keterangan' => KeteranganTransferDetail::NOMINAL_SETORAN,
        ];
        if ($this->transfer->saveTransfer($transfer, $transferDetail)) {
            $this->tabungan->updateNominal([
                'tipe' => 'menambahkan',
                'tabungan' => $tabungan,
                'nominal' => $request->nominalTabungan,
            ]);
            $this->anggota->updateOrCreateSimpanan([
                'anggota' => $request->anggota,
                'tipe' => TipeTransaksi::TABUNGAN,
                'aksi' => 'menambahkan',
                'nominal' => $request->nominalTabungan,
            ]);
            return back()->with('success', 'Setoran tabungan berhasil disimpan');
        } else {
            return back()->with('error', 'Terjadi kesalahan pada saat penyimpanan data');
        }
    }
    public function tarik(TabunganTarikRequest $request)
    {
        // tabungan yang ditambah
        $pengaturanTunai = $this->pengaturan->getWhereOne(['id', 'tabungan_id'], ['toko_id' => $request->toko, 'tipe' => TipePengaturan::TUNAI]);
        $tabungan = $pengaturanTunai->tabungan_id;
        $nominalBiayaYangDigunakan = $request->nominalPengambilan;
        if ($request->tabunganYangDigunakan) {
            $tabungan = $request->tabunganYangDigunakan;
            if ($request->biayaTransfer) {
                $transferDetail[] = [
                    'tabungan' => $request->tabunganYangDigunakan,
                    'nominal' => $request->biayaTransfer,
                    'tipe' => TipeTransaksiDetail::MENGURANGI,
                    'keterangan' => KeteranganTransferDetail::BIAYA_TRANSFER,
                ];
                $nominalBiayaYangDigunakan = $request->nominalPengambilan + $request->biayaTransfer;
            }
        }
        $transferDetail[] = [
            'tabungan' => $tabungan,
            'nominal' => $request->nominalPengambilan,
            'tipe' => TipeTransaksiDetail::MENGURANGI,
            'keterangan' => KeteranganTransferDetail::NOMINAL_PENARIKAN,
        ];
        $tabunganBiayaAdmin = $pengaturanTunai->tabungan_id;
        if ($request->tabunganBiayaAdmin) {
            $tabunganBiayaAdmin = $request->tabunganBiayaAdmin;
        }
        $transferDetail[] = [
            'tabungan' => $tabunganBiayaAdmin,
            'nominal' => $request->nominalBiayaAdmin,
            'tipe' => TipeTransaksiDetail::MENAMBAH,
            'keterangan' => KeteranganTransferDetail::BIAYA_ADMIN,
        ];
        $transfer = [
            'toko' => $request->toko,
            'anggota' => $request->anggota,
            'total' => $nominalBiayaYangDigunakan + $request->nominalBiayaAdmin,
            'tipe' => TipeTransaksi::TABUNGAN,
            'status' => StatusTransfer::MENUNGGU,
            'keterangan' => $request->keterangan,
        ];
        if ($this->transfer->saveTransfer($transfer, $transferDetail)) {
            $this->tabungan->updateNominal([
                'tipe' => 'mengurangi',
                'tabungan' => $tabungan,
                'nominal' => $nominalBiayaYangDigunakan,
            ]);
            $this->tabungan->updateNominal([
                'tipe' => 'menambahkan',
                'tabungan' => $tabunganBiayaAdmin,
                'nominal' => $request->nominalBiayaAdmin,
            ]);
            $this->anggota->updateOrCreateSimpanan([
                'anggota' => $request->anggota,
                'tipe' => TipeTransaksi::TABUNGAN,
                'aksi' => 'mengurangi',
                'nominal' => $request->nominalPengambilan,
            ]);
            return back()->with('success', 'Penarikan tabungan berhasil disimpan');
        } else {
            return back()->with('error', 'Terjadi kesalahan pada saat penyimpanan data');
        }
    }
}
