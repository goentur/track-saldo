<?php

namespace App\Repositories\Master\Toko;

interface TokoRepositoryInterface
{
    public function get(array $select);

    public function gatAllData($search, $number);

    public function create(array $data);

    public function find($id);
    
    public function update(array $data, $id);
    
    public function delete($id);

    public function getTokosByUser(array $select);
}
