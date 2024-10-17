<?php

namespace App\Http\Controllers;

use App\Enums\KeteranganTransferDetail;
use App\Enums\TipeTransaksi;
use App\Enums\TipeTransaksiDetail;
use App\Http\Controllers\Controller;
use App\Services\TransferService;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __construct(
        protected TransferService $transfer,
    ) {}
    public function index(Request $request)
    {
        $request->validate([
            'toko' => ['required', 'uuid'],
        ]);
        $tanggal = $this->tanggal();
        $user = auth()->user()->id;
        $toko = $request->toko;
        return response()->json([
            'tanggal' => [
                'awal' => date('d-m-Y', $tanggal['awal']),
                'akhir' => date('d-m-Y', $tanggal['akhir']),
            ],
            'data' => [
                'perputaran' => $this->perputaran($user, $toko),
                'penambahan' => $this->penambahan($user, $toko),
                'pengurangan' => $this->pengurangan($user, $toko),
                'biayaAdmin' => $this->biayaAdmin($user, $toko),
                'biayaTransfer' => $this->biayaTransfer($user, $toko),
                'pendapatan' => $this->pendapatan($user, $toko),
                'produktif' => $this->produktif($user, $toko),
                'konsumtif' => $this->konsumtif($user, $toko),
            ]
        ], 200);
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
    public function perputaran($user, $toko)
    {
        return cache()->remember($user . '-dashboard-perputaran', now()->addMinutes(1), function () use ($toko) {
            $tanggal = $this->tanggal();
            $result = $this->transfer->getWhere(['total'], [
                'toko' => $toko,
                'tipe' => null,
                'awal' => $tanggal['awal'],
                'akhir' => $tanggal['akhir'],
            ]);
            return rupiah($result->sum('total'));
        });
    }
    public function penambahan($user, $toko)
    {
        return cache()->remember($user . '-dashboard-penambahan', now()->addMinutes(1), function () use ($toko) {
            $tanggal = $this->tanggal();
            $result = $this->transfer->getWhereDetail(['nominal'], [
                'whereDetail' => ['tipe' => TipeTransaksiDetail::MENAMBAH],
                'toko' => $toko,
                'awal' => $tanggal['awal'],
                'akhir' => $tanggal['akhir'],
            ]);
            return rupiah($result->sum('nominal'));
        });
    }
    public function pengurangan($user, $toko)
    {
        return cache()->remember($user . '-dashboard-pengurangan', now()->addMinutes(1), function () use ($toko) {
            $tanggal = $this->tanggal();
            $result = $this->transfer->getWhereDetail(['nominal'], [
                'whereDetail' => ['tipe' => TipeTransaksiDetail::MENGURANGI],
                'toko' => $toko,
                'awal' => $tanggal['awal'],
                'akhir' => $tanggal['akhir'],
            ]);
            return rupiah($result->sum('nominal'));
        });
    }
    public function biayaAdmin($user, $toko)
    {
        return cache()->remember($user . '-dashboard-biaya-admin', now()->addMinutes(1), function () use ($toko) {
            $tanggal = $this->tanggal();
            $result = $this->transfer->getWhereDetail(['nominal'], [
                'whereDetail' => ['keterangan' => KeteranganTransferDetail::BIAYA_ADMIN],
                'toko' => $toko,
                'awal' => $tanggal['awal'],
                'akhir' => $tanggal['akhir'],
            ]);
            return rupiah($result->sum('nominal'));
        });
    }
    public function biayaTransfer($user, $toko)
    {
        return cache()->remember($user . '-dashboard-biaya-transfer', now()->addMinutes(1), function () use ($toko) {
            $tanggal = $this->tanggal();
            $result = $this->transfer->getWhereDetail(['nominal'], [
                'whereDetail' => ['keterangan' => KeteranganTransferDetail::BIAYA_TRANSFER],
                'toko' => $toko,
                'awal' => $tanggal['awal'],
                'akhir' => $tanggal['akhir'],
            ]);
            return rupiah($result->sum('nominal'));
        });
    }
    public function pendapatan($user, $toko)
    {
        return cache()->remember($user . '-dashboard-pendapatan', now()->addMinutes(1), function () use ($user, $toko) {
            return rupiah(str_replace(',', '', $this->biayaAdmin($user, $toko)) - str_replace(',', '', $this->biayaTransfer($user, $toko)));
        });
    }
    public function produktif($user, $toko)
    {
        return cache()->remember($user . '-dashboard-produktif', now()->addMinutes(1), function () use ($toko) {
            $tanggal = $this->tanggal();
            $result = $this->transfer->getWhere(['total'], [
                'toko' => $toko,
                'tipe' => TipeTransaksi::PRODUKTIF,
                'awal' => $tanggal['awal'],
                'akhir' => $tanggal['akhir'],
            ]);
            return rupiah($result->sum('total'));
        });
    }
    public function konsumtif($user, $toko)
    {
        return cache()->remember($user . '-dashboard-konsumtif', now()->addMinutes(1), function () use ($toko) {
            $tanggal = $this->tanggal();
            $result = $this->transfer->getWhere(['total'], [
                'toko' => $toko,
                'tipe' => TipeTransaksi::KONSUMTIF,
                'awal' => $tanggal['awal'],
                'akhir' => $tanggal['akhir'],
            ]);
            return rupiah($result->sum('total'));
        });
    }
}
