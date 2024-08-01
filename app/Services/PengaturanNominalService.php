<?php

namespace App\Services;

use App\Repositories\Pengaturan\PengaturanNominalRepositoryInterface;

class PengaturanNominalService
{
    public function __construct(
        protected PengaturanNominalRepositoryInterface $pengaturan,
    ) {
    }
    public function getPengaturanNominalByToko(array $select, $tipe)
    {
        return $this->pengaturan->getPengaturanNominalByToko($select, $tipe);
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
