<?php

namespace App\Repositories\Master\Toko;

interface TokoRepositoryInterface
{
    public function get(array $selected);

    public function paginate($search, $number);

    public function create(array $data);

    public function where(array $data);

    public function getTokosByUser(array $select);

    public function find($id);

    public function update(array $data, $id);

    public function delete($id);
}
