<?php

namespace App\Services\Master;

use App\Repositories\Master\ZonaWaktu\ZonaWaktuRepositoryInterface;

class ZonaWaktuService
{
    public function __construct(protected ZonaWaktuRepositoryInterface $zonaWaktu)
    {
    }

    public function get(array $where)
    {
        return $this->zonaWaktu->get($where);
    }

    public function paginate($search, $number)
    {
        return $this->zonaWaktu->paginate($search, $number);
    }

    public function create(array $data)
    {
        return $this->zonaWaktu->create($data);
    }

    public function find($id)
    {
        return $this->zonaWaktu->find($id);
    }

    public function update(array $data, $id)
    {
        return $this->zonaWaktu->update($data, $id);
    }

    public function delete($id)
    {
        return $this->zonaWaktu->delete($id);
    }
}
