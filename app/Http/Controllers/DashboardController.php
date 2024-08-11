<?php

namespace App\Http\Controllers;

use App\Enums\KeteranganTransferDetail;
use App\Enums\TipeTransaksi;
use App\Enums\TipeTransaksiDetail;
use App\Http\Controllers\Controller;
use App\Services\TransferService;

class DashboardController extends Controller
{
    public function __construct(
        protected TransferService $transfer,
    ) {}
    public function index()
    {
        $tanggal = $this->tanggal();
        return inertia(
            'Dashboard/Index',
            [
                'tanggal' => [
                    'awal' => date('d-m-Y', $tanggal['awal']),
                    'akhir' => date('d-m-Y', $tanggal['akhir']),
                ],
                'data' => [
                    'perputaran' => $this->perputaran(),
                    'penambahan' => $this->penambahan(),
                    'pengurangan' => $this->pengurangan(),
                    'biayaAdmin' => $this->biayaAdmin(),
                    'biayaTransfer' => $this->biayaTransfer(),
                    'pendapatan' => $this->pendapatan(),
                    'produktif' => $this->produktif(),
                    'konsumtif' => $this->konsumtif(),
                ]
            ]
        );
    }
    public function toko()
    {
        return cache()->remember(auth()->user()->id . '-toko', now()->addMinutes(480), function () use (&$transfer) {
            $tokoId = [];
            foreach (auth()->user()->toko as $toko) {
                $tokoId[] = $toko->id;
            }
            return $tokoId;
        });
    }
    public function tanggal()
    {
        $zonaWaktuPengguna = zonaWaktuPengguna();
        $timePengguna = time() + $zonaWaktuPengguna->gmt_offset;
        return [
            'awal' => $timePengguna - 604800,
            'akhir' => $timePengguna,
        ];
    }
    public function perputaran()
    {
        return cache()->remember(auth()->user()->id . '-dashboard-perputaran', now()->addMinutes(1), function () {
            $tanggal = $this->tanggal();
            $result = $this->transfer->getWhere(['total'], [
                'toko' => $this->toko(),
                'tipe' => null,
                'awal' => $tanggal['awal'],
                'akhir' => $tanggal['akhir'],
            ]);
            return rupiah($result->sum('total'));
        });
    }
    public function penambahan()
    {
        return cache()->remember(auth()->user()->id . '-dashboard-penambahan', now()->addMinutes(1), function () {
            $tanggal = $this->tanggal();
            $result = $this->transfer->getWhereDetail(['nominal'], [
                'whereDetail' => ['tipe' => TipeTransaksiDetail::MENAMBAH],
                'toko' => $this->toko(),
                'awal' => $tanggal['awal'],
                'akhir' => $tanggal['akhir'],
            ]);
            return rupiah($result->sum('nominal'));
        });
    }
    public function pengurangan()
    {
        return cache()->remember(auth()->user()->id . '-dashboard-pengurangan', now()->addMinutes(1), function () {
            $tanggal = $this->tanggal();
            $result = $this->transfer->getWhereDetail(['nominal'], [
                'whereDetail' => ['tipe' => TipeTransaksiDetail::MENGURANGI],
                'toko' => $this->toko(),
                'awal' => $tanggal['awal'],
                'akhir' => $tanggal['akhir'],
            ]);
            return rupiah($result->sum('nominal'));
        });
    }
    public function biayaAdmin()
    {
        return cache()->remember(auth()->user()->id . '-dashboard-biaya-admin', now()->addMinutes(1), function () {
            $tanggal = $this->tanggal();
            $result = $this->transfer->getWhereDetail(['nominal'], [
                'whereDetail' => ['keterangan' => KeteranganTransferDetail::BIAYA_ADMIN],
                'toko' => $this->toko(),
                'awal' => $tanggal['awal'],
                'akhir' => $tanggal['akhir'],
            ]);
            return rupiah($result->sum('nominal'));
        });
    }
    public function biayaTransfer()
    {
        return cache()->remember(auth()->user()->id . '-dashboard-biaya-transfer', now()->addMinutes(1), function () {
            $tanggal = $this->tanggal();
            $result = $this->transfer->getWhereDetail(['nominal'], [
                'whereDetail' => ['keterangan' => KeteranganTransferDetail::BIAYA_TRANSFER],
                'toko' => $this->toko(),
                'awal' => $tanggal['awal'],
                'akhir' => $tanggal['akhir'],
            ]);
            return rupiah($result->sum('nominal'));
        });
    }
    public function pendapatan()
    {
        return cache()->remember(auth()->user()->id . '-dashboard-pendapatan', now()->addMinutes(1), function () {
            return rupiah(str_replace(',', '', $this->biayaAdmin()) - str_replace(',', '', $this->biayaTransfer()));
        });
    }
    public function produktif()
    {
        return cache()->remember(auth()->user()->id . '-dashboard-produktif', now()->addMinutes(1), function () {
            $tanggal = $this->tanggal();
            $result = $this->transfer->getWhere(['total'], [
                'toko' => $this->toko(),
                'tipe' => TipeTransaksi::PRODUKTIF,
                'awal' => $tanggal['awal'],
                'akhir' => $tanggal['akhir'],
            ]);
            return rupiah($result->sum('total'));
        });
    }
    public function konsumtif()
    {
        return cache()->remember(auth()->user()->id . '-dashboard-konsumtif', now()->addMinutes(1), function () {
            $tanggal = $this->tanggal();
            $result = $this->transfer->getWhere(['total'], [
                'toko' => $this->toko(),
                'tipe' => TipeTransaksi::KONSUMTIF,
                'awal' => $tanggal['awal'],
                'akhir' => $tanggal['akhir'],
            ]);
            return rupiah($result->sum('total'));
        });
    }
}
