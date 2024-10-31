<?php

namespace App\Http\Controllers\Transaksi\Transfer;

use App\Enums\KeteranganTransferDetail;
use App\Enums\StatusTransfer;
use App\Enums\TipePengaturan;
use App\Enums\TipeTransaksi;
use App\Enums\TipeTransaksiDetail;
use App\Http\Controllers\Controller;
use App\Http\Requests\Transaksi\PenghasilanLainRequest;
use App\Services\Master\AnggotaService;
use App\Services\Master\TabunganService;
use App\Services\Master\TokoService;
use App\Services\PengaturanService;
use App\Services\TransferService;

class PenghasilanLainController extends Controller
{
    public function __construct(
        protected TokoService $toko,
        protected TransferService $transfer,
        protected TabunganService $tabungan,
        protected PengaturanService $pengaturan,
        protected AnggotaService $anggota,
    ) {}
    public function simpan(PenghasilanLainRequest $request)
    {
        $tabungan = $request->tabungan;
        if (is_null($request->tabungan)) {
            $pengaturanTunai = $this->pengaturan->getWhereOne(['id', 'tabungan_id'], ['toko_id' => $request->toko, 'tipe' => TipePengaturan::TUNAI]);
            $tabungan = $pengaturanTunai->tabungan_id;
        }
        $nominal = $request->nominal;
        if ($request->biayaTransfer) {
            $transferDetail[] = [
                'tabungan' => $tabungan,
                'nominal' => $request->biayaTransfer,
                'tipe' => TipeTransaksiDetail::MENGURANGI,
                'keterangan' => KeteranganTransferDetail::BIAYA_TRANSFER,
            ];
            $nominal = $request->nominal + $request->biayaTransfer;
        }
        $transferDetail[] = [
            'tabungan' => $tabungan,
            'nominal' => $request->nominal,
            'tipe' => TipeTransaksiDetail::MENAMBAH,
            'keterangan' => KeteranganTransferDetail::NOMINAL_PEMASUKAN,
        ];
        // transfer
        $transfer = [
            'toko' => $request->toko,
            'anggota' => $request->anggota,
            'total' => $nominal,
            'tipe' => TipeTransaksi::PENGHASILAN_LAIN,
            'status' => StatusTransfer::MENUNGGU,
            'keterangan' => $request->keterangan,
        ];
        if ($this->transfer->saveTransfer($transfer, $transferDetail)) {
            $this->tabungan->updateNominal([
                'tipe' => 'menambahkan',
                'tabungan' => $tabungan,
                'nominal' => $nominal,
            ]);
            if ($request->anggota) {
                $this->anggota->updatePoin([
                    'anggota' => $request->anggota,
                    'aksi' => 'menambahkan',
                    'nominal' => $request->nominal,
                ]);
            }
            return response()->json(['message' => 'Penghasilan lain berhasil disimpan'], 200);
        } else {
            return response()->json(['message' => 'Terjadi kesalahan pada saat penyimpanan data'], 422);
        }
    }
}
