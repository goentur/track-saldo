<?php

namespace App\Services\Master;

use App\Repositories\Master\Anggota\AnggotaRepositoryInterface;

class AnggotaService
{
    public function __construct(protected AnggotaRepositoryInterface $anggota)
    {
    }

    public function all()
    {
        return $this->anggota->all();
    }

    public function paginate($search, $number)
    {
        return $this->anggota->paginate($search, $number);
    }

    public function create(array $data)
    {
        return $this->anggota->create($data);
    }
    public function getAnggotasByUser(array $select)
    {
        return $this->anggota->getAnggotasByUser($select);
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
}
