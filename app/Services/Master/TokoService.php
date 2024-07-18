<?php

namespace App\Services\Master;

use App\Repositories\Master\Toko\TokoRepositoryInterface;

class TokoService
{
    public function __construct(
        protected TokoRepositoryInterface $toko,
    )
    {
    }

    public function get(array $select)
    {
        return $this->toko->get($select);
    }

    public function gatAllData($search, $number)
    {
        return $this->toko->gatAllData($search, $number);
    }

    public function create(array $data)
    {
        return $this->toko->create($data);
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

    public function getTokosByUser(array $select)
    {
        return $this->toko->getTokosByUser($select);
    }
}
