<?php

namespace App\Services\Admin\Master;

use App\Repositories\Admin\Master\Merek\MerekRepositoryInterface;

class MerekService
{
    public function __construct(protected MerekRepositoryInterface $merek)
    {
    }

    public function all()
    {
        return $this->merek->all();
    }

    public function paginate($search, $number)
    {
        return $this->merek->paginate($search, $number);
    }

    public function create(array $data)
    {
        return $this->merek->create($data);
    }

    public function find($id)
    {
        return $this->merek->find($id);
    }

    public function update(array $data, $id)
    {
        return $this->merek->update($data, $id);
    }

    public function delete($id)
    {
        return $this->merek->delete($id);
    }
}
