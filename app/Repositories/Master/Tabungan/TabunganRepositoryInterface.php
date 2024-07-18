<?php

namespace App\Repositories\Master\Tabungan;

interface TabunganRepositoryInterface
{
    public function gatAllData($search, $number);

    public function create(array $data);

    public function find($id);
    
    public function update(array $data, $id);
    
    public function delete($id);

    public function getWhere(array $select, array $data);

    public function getTabungansByToko(array $select);

    public function updateNominal(array $data);
}
