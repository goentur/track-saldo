<?php

namespace App\Repositories\Pengaturan;

interface PengaturanRepositoryInterface
{
    public function getPengaturanByToko(array $select, $tipe);

    public function getWhere(array $select, array $where);

    public function getWhereOne(array $select, array $where);

    public function simpan(array $data);

    public function update(array $data, $id);
}
