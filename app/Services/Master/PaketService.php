<?php

namespace App\Services\Master;

use App\Repositories\Master\Paket\PaketRepositoryInterface;

class PaketService
{
    public function __construct(
        protected PaketRepositoryInterface $paket,
    ) {
    }

    public function gatAllData($search, $number)
    {
        return $this->paket->gatAllData($search, $number);
    }

    public function create(array $data)
    {
        return $this->paket->create($data);
    }

    public function find($id)
    {
        return $this->paket->find($id);
    }

    public function update(array $data, $id)
    {
        return $this->paket->update($data, $id);
    }

    public function delete($id)
    {
        return $this->paket->delete($id);
    }

    public function getWhere(array $select, array $where)
    {
        return $this->paket->getWhere($select, $where);
    }
}
