<?php

namespace App\Http\Controllers\Transaksi\Transfer;

use App\Enums\StatusTransfer;
use App\Enums\TipeTransfer;
use App\Enums\TipeTransferDetail;
use App\Http\Controllers\Controller;
use App\Http\Requests\Transfer\ViaATMNasabahRequest;
use App\Services\Master\AnggotaService;
use App\Services\Master\TabunganService;
use App\Services\Master\TokoService;
use App\Services\TransferService;

class TransferViaATMNasabahController extends Controller
{
    public function __construct(
        protected TokoService $toko,
        protected TransferService $transfer,
        protected TabunganService $tabungan,
        protected AnggotaService $anggota,
    ) {
    }
    public function index()
    {
        return inertia('Transaksi/Transfer/ViaATMNasabah/Index', [
            'tokos' => $this->toko->get(['id', 'nama']),
        ]);
    }
    public function simpan(ViaATMNasabahRequest $request)
    {
        // tranfer
        $transfer = [
            'anggota' => $request->anggota,
            'total' => $request->nominalBiayaAdmin,
            'tipe' => TipeTransfer::TRANSFER_VIA_ATM_NASABAH,
            'status' => StatusTransfer::MENUNGGU,
        ];
        // tranfer detail
        $transferDetail[] = [
            'tabungan' => $request->tabunganBiayaAdmin,
            'nominal' => $request->nominalBiayaAdmin,
            'tipe' => TipeTransferDetail::BIAYA_ADMIN,
        ];
        if ($this->transfer->saveTransfer($transfer, $transferDetail)) {
            $this->tabungan->updateNominal([
                'tipe' => 'menambahkan',
                'tabungan' => $request->tabunganBiayaAdmin,
                'nominal' => $request->nominalBiayaAdmin,
            ]);
            $this->anggota->updatePoin([
                'anggota' => $request->anggota,
                'nominal' => $request->nominalBiayaAdmin,
            ]);
            return to_route('transfer.menu')->with('success', 'Transfer berhasil disimpan');
        } else {
            return to_route('via-atm-nasabah.index')->with('error', 'Terjadi kesalahan pada saat penyimpanan data');
        }
        
    }
}
