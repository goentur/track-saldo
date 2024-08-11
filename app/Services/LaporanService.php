<?php

namespace App\Services;

use App\Repositories\Laporan\LaporanRepositoryInterface;

class LaporanService
{
    public function __construct(
        protected LaporanRepositoryInterface $laporan,
    ) {}

    public function transaksi(array $data)
    {
        return $this->laporan->transaksi($data);
    }
    public function transaksiDetail(array $data)
    {
        return $this->laporan->transaksiDetail($data);
    }
}
