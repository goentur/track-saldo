<?php

namespace App\Services\Master;

use App\Repositories\Master\Pegawai\PegawaiRepositoryInterface;

class PegawaiService
{
    public function __construct(protected PegawaiRepositoryInterface $pegawai)
    {
    }

    public function gatAllData($search, $number)
    {
        return $this->pegawai->gatAllData($search, $number);
    }

    public function create(array $data)
    {
        return $this->pegawai->create($data);
    }

    public function find($id)
    {
        return $this->pegawai->find($id);
    }

    public function update(array $data, $id)
    {
        return $this->pegawai->update($data, $id);
    }

    public function delete($id)
    {
        return $this->pegawai->delete($id);
    }
}
