<?php

namespace App\Services;

use App\Repositories\Pengaturan\PengaturanRepositoryInterface;

class PengaturanService
{
    public function __construct(
        protected PengaturanRepositoryInterface $pengaturan,
    ) {
    }
    public function getPengaturanByToko(array $select, $tipe)
    {
        return $this->pengaturan->getPengaturanByToko($select, $tipe);
    }
    public function getWhere(array $select, array $where)
    {
        return $this->pengaturan->getWhere($select, $where);
    }
    public function getWhereOne(array $select, array $where)
    {
        return $this->pengaturan->getWhereOne($select, $where);
    }
    public function simpan(array $data)
    {
        return $this->pengaturan->simpan($data);
    }
    public function update(array $data, $id)
    {
        return $this->pengaturan->update($data, $id);
    }
}
