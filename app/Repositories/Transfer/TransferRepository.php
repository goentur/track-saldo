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
                'keterangan' => $data['keterangan'],
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
    public function get(array $data)
    {
        $query = Transaksi::whereIn('toko_id', $data['toko'])
        ->whereBetween('tanggal', [$data['tanggalAwal'], $data['tanggalAkhir']]);
        if (!empty($data['with'])) {
            $query->with($data['with']);
        }
        if (!empty($data['select'])) {
            $query->select($data['select']);
        }
        if (!empty($data['tipe'])) {
            $query->whereIn('tipe', $data['tipe']);
        }
        if (!empty($data['anggota'])) {
            $query->where('anggota_id', $data['anggota']);
        }
        if (!empty($data['nominal'])) {
            $query->where('total', '>=', $data['nominal'])->orderBy('total', 'asc');
        } else {
            $query->orderBy('tanggal', 'desc');
        }
        return $query->get();
    }
    public function getWhere(array $select, array $where)
    {
        $query = Transaksi::select($select)
            ->whereIn('toko_id', [$where['toko']])
            ->whereBetween('tanggal', [$where['awal'], $where['akhir']]);
        if (!empty($where['tipe'])) {
            $query->where('tipe', $where['tipe']);
        }
        return $query->get();
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
    public function getOnlyOne($id)
    {
        return Transaksi::with('user', 'anggota', 'transaksiDetail')->where('id', $id)->first();
    }
}
