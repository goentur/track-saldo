<?php

namespace App\Repositories\Master\Anggota;

interface AnggotaRepositoryInterface
{
    public function all();

    public function paginate($search, $number);

    public function create(array $data);

    public function getAnggotasByUser(array $select);

    public function find($id);

    public function update(array $data, $id);

    public function delete($id);
}
