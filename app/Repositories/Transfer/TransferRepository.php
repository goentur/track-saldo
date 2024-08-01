<?php

namespace App\Repositories\Transfer;

use App\Models\Transfer;
use App\Models\TransferDetail;
use Illuminate\Support\Facades\DB;

class TransferRepository implements TransferRepositoryInterface
{
    public function saveTransfer(array $transfer, array $transferDetails)
    {
        try {
            DB::beginTransaction();
            $transfer = Transfer::create([
                'user_id' => auth()->user()->id,
                'anggota_id' => $transfer['anggota'],
                'tanggal' => time(),
                'total' => $transfer['total'],
                'tipe' => $transfer['tipe'],
                'status' => $transfer['status'],
            ]);
            foreach ($transferDetails as $transferDetail) {
                TransferDetail::create([
                    'transaksi_id' => $transfer->id,
                    'tabungan_id' => $transferDetail['tabungan'],
                    'nominal' => $transferDetail['nominal'],
                    'tipe' => $transferDetail['tipe'],
                    'keterangan' => $transferDetail['keterangan'],
                ]);
            }
            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            return $e;
        }
    }
}
