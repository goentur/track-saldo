<?php

namespace App\Services\Master;

use App\Repositories\Master\Tabungan\TabunganRepositoryInterface;

class TabunganService
{
    public function __construct(protected TabunganRepositoryInterface $tabungan)
    {
    }

    public function all()
    {
        return $this->tabungan->all();
    }

    public function paginate($search, $number)
    {
        return $this->tabungan->paginate($search, $number);
    }

    public function create(array $data)
    {
        return $this->tabungan->create($data);
    }
    public function where(array $data)
    {
        return $this->tabungan->where($data);
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
}
