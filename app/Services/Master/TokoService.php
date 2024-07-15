<?php

namespace App\Services\Master;

use App\Repositories\Master\Toko\TokoRepositoryInterface;

class TokoService
{
    public function __construct(protected TokoRepositoryInterface $toko)
    {
    }

    public function get(array $selected)
    {
        return $this->toko->get($selected);
    }

    public function paginate($search, $number)
    {
        return $this->toko->paginate($search, $number);
    }

    public function create(array $data)
    {
        return $this->toko->create($data);
    }

    public function where(array $data)
    {
        return $this->toko->where($data);
    }

    public function getTokosByUser(array $seelct)
    {
        return $this->toko->getTokosByUser($seelct);
    }

    public function find($id)
    {
        return $this->toko->find($id);
    }

    public function update(array $data, $id)
    {
        return $this->toko->update($data, $id);
    }

    public function delete($id)
    {
        return $this->toko->delete($id);
    }
}
