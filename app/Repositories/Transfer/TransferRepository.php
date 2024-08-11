<?php

namespace App\Repositories\Transfer;

use App\Models\Transaksi;
use App\Models\TransaksiDetail;
use Illuminate\Support\Facades\DB;

class TransferRepository implements TransferRepositoryInterface
{
    public function saveTransfer(array $data, array $dataDetails)
    {
        try {
            DB::beginTransaction();
            $transaksi = Transaksi::create([
                'user_id' => auth()->user()->id,
                'toko_id' => $data['toko'],
                'anggota_id' => $data['anggota'],
                'tanggal' => time(),
                'total' => $data['total'],
                'tipe' => $data['tipe'],
                'status' => $data['status'],
            ]);
            foreach ($dataDetails as $dataDetail) {
                TransaksiDetail::create([
                    'transaksi_id' => $transaksi->id,
                    'tabungan_id' => $dataDetail['tabungan'],
                    'nominal' => $dataDetail['nominal'],
                    'tipe' => $dataDetail['tipe'],
                    'keterangan' => $dataDetail['keterangan'],
                ]);
            }
            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            return $e;
        }
    }
    public function getWhere(array $select, array $where)
    {
        if ($where['tipe'] == null) {
            return Transaksi::select($select)->whereIn('toko_id', [$where['toko']])->whereBetween('tanggal', [$where['awal'], $where['akhir']])->get();
        } else {
            return Transaksi::select($select)->where('tipe', $where['tipe'])->whereIn('toko_id', [$where['toko']])->whereBetween('tanggal', [$where['awal'], $where['akhir']])->get();
        }
    }
    public function getWhereDetail(array $select, array $where)
    {
        return TransaksiDetail::select($select)
            ->where($where['whereDetail'])
            ->whereHas('transaksi', function ($query) use ($where) {
                $query->whereIn('toko_id', [$where['toko']])->whereBetween('tanggal', [$where['awal'], $where['akhir']]);
            })
            ->get();
    }
}
