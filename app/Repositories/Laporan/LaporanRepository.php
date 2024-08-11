<?php

namespace App\Repositories\Laporan;

use App\Models\Transaksi;

class LaporanRepository implements LaporanRepositoryInterface
{
    public function transaksi(array $data)
    {
        return Transaksi::with('user', 'toko', 'anggota')->where('toko_id', $data['toko'])->whereBetween('tanggal', [$data['tanggalAwal'], $data['tanggalAkhir']])->get();
    }
    public function transaksiDetail(array $data)
    {
        return Transaksi::with('user', 'toko', 'anggota', 'transaksiDetail')->where('toko_id', $data['toko'])->whereBetween('tanggal', [$data['tanggalAwal'], $data['tanggalAkhir']])->get();
    }
}
