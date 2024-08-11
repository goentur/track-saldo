<?php

namespace App\Repositories\Laporan;

interface LaporanRepositoryInterface
{
    public function transaksi(array $data);

    public function transaksiDetail(array $data);
}
