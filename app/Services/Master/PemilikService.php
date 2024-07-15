<?php

namespace App\Services\Master;

use App\Repositories\Master\Pemilik\PemilikRepositoryInterface;

class PemilikService
{
    public function __construct(protected PemilikRepositoryInterface $pemilik)
    {
    }

    public function all()
    {
        return $this->pemilik->all();
    }

    public function paginate($search, $number)
    {
        return $this->pemilik->paginate($search, $number);
    }

    public function create(array $data)
    {
        return $this->pemilik->create($data);
    }

    public function find($id)
    {
        return $this->pemilik->find($id);
    }

    public function update(array $data, $id)
    {
        return $this->pemilik->update($data, $id);
    }

    public function delete($id)
    {
        return $this->pemilik->delete($id);
    }
}
