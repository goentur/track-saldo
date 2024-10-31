<?php

namespace App\Http\Controllers;

use App\Enums\KeteranganTransferDetail;
use App\Enums\TipeTransaksi;
use App\Enums\TipeTransaksiDetail;
use App\Http\Controllers\Controller;
use App\Http\Requests\DashboardRequest;
use App\Services\TransferService;

class DashboardController extends Controller
{
    public function __construct(
        protected TransferService $transfer,
    ) {}
    public function index(DashboardRequest $request)
    {
        $tanggal = pecahTanggalRiwayat($request->tanggal, zonaWaktuPengguna());
        $user = auth()->user()->id;
        $toko = $request->toko;
        return response()->json([
            'tanggal' => [
                'awal' => date('d-m-Y', $tanggal['awal']),
                'akhir' => date('d-m-Y', $tanggal['akhir']),
            ],
            'data' => [
                'perputaran' => $this->perputaran($user, $toko, $tanggal),
                'penambahan' => $this->penambahan($user, $toko, $tanggal),
                'pengurangan' => $this->pengurangan($user, $toko, $tanggal),
                'biayaAdmin' => $this->biayaAdmin($user, $toko, $tanggal),
                'biayaTransfer' => $this->biayaTransfer($user, $toko, $tanggal),
                'pendapatan' => $this->pendapatan($user, $toko, $tanggal),
                'produktif' => $this->produktif($user, $toko, $tanggal),
                'konsumtif' => $this->konsumtif($user, $toko, $tanggal),
            ]
        ], 200);
    }
    public function perputaran($user, $toko, $tanggal)
    {
        $result = $this->transfer->getWhere(['total'], [
            'toko' => $toko,
            'tipe' => null,
            'awal' => $tanggal['awal'],
            'akhir' => $tanggal['akhir'],
        ]);
        return rupiah($result->sum('total'));
    }
    public function penambahan($user, $toko, $tanggal)
    {
        $result = $this->transfer->getWhereDetail(['nominal'], [
            'whereDetail' => ['tipe' => TipeTransaksiDetail::MENAMBAH],
            'toko' => $toko,
            'awal' => $tanggal['awal'],
            'akhir' => $tanggal['akhir'],
        ]);
        return rupiah($result->sum('nominal'));
    }
    public function pengurangan($user, $toko, $tanggal)
    {
        $result = $this->transfer->getWhereDetail(['nominal'], [
            'whereDetail' => ['tipe' => TipeTransaksiDetail::MENGURANGI],
            'toko' => $toko,
            'awal' => $tanggal['awal'],
            'akhir' => $tanggal['akhir'],
        ]);
        return rupiah($result->sum('nominal'));
    }
    public function biayaAdmin($user, $toko, $tanggal)
    {
        $result = $this->transfer->getWhereDetail(['nominal'], [
            'whereDetail' => ['keterangan' => KeteranganTransferDetail::BIAYA_ADMIN],
            'toko' => $toko,
            'awal' => $tanggal['awal'],
            'akhir' => $tanggal['akhir'],
        ]);
        return rupiah($result->sum('nominal'));
    }
    public function biayaTransfer($user, $toko, $tanggal)
    {
        $result = $this->transfer->getWhereDetail(['nominal'], [
            'whereDetail' => ['keterangan' => KeteranganTransferDetail::BIAYA_TRANSFER],
            'toko' => $toko,
            'awal' => $tanggal['awal'],
            'akhir' => $tanggal['akhir'],
        ]);
        return rupiah($result->sum('nominal'));
    }
    public function pendapatan($user, $toko, $tanggal)
    {
        return rupiah(str_replace(',', '', $this->biayaAdmin($user, $toko, $tanggal)) - str_replace(',', '', $this->biayaTransfer($user, $toko, $tanggal)));
    }
    public function produktif($user, $toko, $tanggal)
    {
        $result = $this->transfer->getWhere(['total'], [
            'toko' => $toko,
            'tipe' => TipeTransaksi::PRODUKTIF,
            'awal' => $tanggal['awal'],
            'akhir' => $tanggal['akhir'],
        ]);
        return rupiah($result->sum('total'));
    }
    public function konsumtif($user, $toko, $tanggal)
    {
        $result = $this->transfer->getWhere(['total'], [
            'toko' => $toko,
            'tipe' => TipeTransaksi::KONSUMTIF,
            'awal' => $tanggal['awal'],
            'akhir' => $tanggal['akhir'],
        ]);
        return rupiah($result->sum('total'));
    }
}
