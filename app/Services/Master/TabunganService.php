<?php

namespace App\Services\Master;

use App\Repositories\Master\Tabungan\TabunganRepositoryInterface;

class TabunganService
{
    public function __construct(
        protected TabunganRepositoryInterface $tabungan,
    )
    {
    }

    public function gatAllData($search, $number)
    {
        return $this->tabungan->gatAllData($search, $number);
    }

    public function create(array $data)
    {
        return $this->tabungan->create($data);
    }

    public function find($id)
    {
        return $this->tabungan->find($id);
    }

    public function update(array $data, $id)
    {
        return $this->tabungan->update($data, $id);
    }

    public function delete($id)
    {
        return $this->tabungan->delete($id);
    }

    public function getWhere(array $select, array $data)
    {
        return $this->tabungan->getWhere($select, $data);
    }

    public function getTabungansByToko($with, $select, $where, $transaksi = false)
    {
        return $this->tabungan->getTabungansByToko($with, $select, $where, $transaksi);
    }

    public function updateNominal(array $data)
    {
        return $this->tabungan->updateNominal($data);
    }
}
