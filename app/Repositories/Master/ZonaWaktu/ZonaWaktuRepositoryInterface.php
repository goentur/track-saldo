<?php

namespace App\Repositories\Master\ZonaWaktu;

interface ZonaWaktuRepositoryInterface
{
    public function get(array $where);

    public function paginate($search, $number);

    public function create(array $data);

    public function find($id);

    public function update(array $data, $id);

    public function delete($id);
}
