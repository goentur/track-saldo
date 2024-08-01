<?php

namespace App\Repositories\Master\Paket;

interface PaketRepositoryInterface
{
    public function gatAllData($search, $number);

    public function create(array $data);

    public function find($id);

    public function update(array $data, $id);

    public function delete($id);

    public function getWhere(array $select, array $data);
}
