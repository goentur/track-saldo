<?php

namespace App\Http\Controllers\Transaksi\Pengeluaran;

use App\Enums\KeteranganTransferDetail;
use App\Enums\StatusTransfer;
use App\Enums\TipePengaturan;
use App\Enums\TipeTransaksi;
use App\Enums\TipeTransaksiDetail;
use App\Http\Controllers\Controller;
use App\Http\Requests\Transaksi\Konsumtif\DataKonsumtifRequest;
use App\Http\Requests\Transaksi\Konsumtif\SimpanKonsumtifRequest;
use App\Services\Master\TabunganService;
use App\Services\Master\TokoService;
use App\Services\PengaturanService;
use App\Services\TransferService;

class KonsumtifController extends Controller
{
    public function __construct(
        protected TokoService $toko,
        protected TransferService $transfer,
        protected TabunganService $tabungan,
        protected PengaturanService $pengaturan,
    ) {}
    public function simpan(SimpanKonsumtifRequest $request)
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
            'keterangan' => $request->keterangan,
        ];
        if ($this->transfer->saveTransfer($transfer, $transferDetail)) {
            $this->tabungan->updateNominal([
                'tipe' => 'mengurangi',
                'tabungan' => $tabungan,
                'nominal' => $nominal,
            ]);
            return response()->json(['message' => 'Konsumtif berhasil disimpan'], 200);
        } else {
            return response()->json(['message' => 'Terjadi kesalahan pada saat penyimpanan data'], 422);
        }
    }
    public function data(DataKonsumtifRequest $request)
    {
        $tanggal = pecahTanggalRiwayat($request->tanggal, zonaWaktuPengguna());
        $where = [
            'toko' => [$request->toko],
            'tanggalAwal' => $tanggal['awal'],
            'tanggalAkhir' => $tanggal['akhir'],
            'with' => ['user'],
            'tipe' => [TipeTransaksi::KONSUMTIF],
        ];
        $zonaWaktuPengguna = zonaWaktuPengguna();
        $transaksi = $this->transfer->get($where);
        $total = 0;
        $datas = [];

        foreach ($transaksi as $key => $value) {
            $valueTotal = $value->total;
            $total += $valueTotal;
            $datas[] = [
                'no' => ++$key,
                'tanggal' => formatTanggal($value->tanggal, $zonaWaktuPengguna),
                'pengguna' => $value->user?->name,
                'total' => rupiah($value->total),
                'tipe' => $value->tipe,
                'keterangan' => $value->keterangan,
            ];
        }
        $response = [
            'tanggalAwal' => $tanggal['textTanggalAwal'],
            'tanggalAkhir' => $tanggal['textTanggalAkhir'],
            'data' => $datas,
            'total' => rupiah($total),
        ];
        return response()->json($response, 200);
    }
}
