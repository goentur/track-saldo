<?php

namespace App\Repositories\Master\Merek;

interface MerekRepositoryInterface
{
    public function all();

    public function paginate($search, $number);

    public function create(array $data);

    public function getMereksByToko(array $select);

    public function find($id);

    public function update(array $data, $id);

    public function delete($id);
}
