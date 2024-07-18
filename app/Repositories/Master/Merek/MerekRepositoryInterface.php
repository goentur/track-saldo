<?php

namespace App\Repositories\Master\Merek;

interface MerekRepositoryInterface
{
    public function gatAllData($search, $number);

    public function create(array $data);

    public function find($id);
    
    public function update(array $data, $id);
    
    public function delete($id);

    public function getWhere(array $select, array $where);

    public function getMereksByToko(array $select);
}
