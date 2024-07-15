<?php

namespace App\Repositories\Master\Pemilik;

interface PemilikRepositoryInterface
{
    public function all();

    public function paginate($search, $number);

    public function create(array $data);

    public function find($id);

    public function update(array $data, $id);

    public function delete($id);
}
