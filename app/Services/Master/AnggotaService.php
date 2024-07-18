<?php

namespace App\Services\Master;

use App\Repositories\Master\Anggota\AnggotaRepositoryInterface;

class AnggotaService
{
    public function __construct(
        protected AnggotaRepositoryInterface $anggota,
    )
    {
    }

    public function gatAllData($search, $number)
    {
        return $this->anggota->gatAllData($search, $number);
    }

    public function create(array $data)
    {
        return $this->anggota->create($data);
    }

    public function find($id)
    {
        return $this->anggota->find($id);
    }

    public function update(array $data, $id)
    {
        return $this->anggota->update($data, $id);
    }

    public function delete($id)
    {
        return $this->anggota->delete($id);
    }

    public function getWhere(array $select, array $where)
    {
        return $this->anggota->getWhere($select, $where);
    }
    public function getAnggotasByUser(array $select)
    {
        return $this->anggota->getAnggotasByUser($select);
    }
    public function updatePoin(array $data)
    {
        return $this->anggota->updatePoin($data);
    }
}
