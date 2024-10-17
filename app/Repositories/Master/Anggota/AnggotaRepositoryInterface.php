<?php

namespace App\Repositories\Master\Anggota;

interface AnggotaRepositoryInterface
{
    public function gatAllData($request);

    public function create(array $data);

    public function find($id);

    public function update(array $data, $id);

    public function delete($id);

    public function getWhere(array $select, array $data);

    public function getAnggotasByUser(array $select);

    public function updatePoin(array $data);

    public function updateOrCreateSimpanan(array $data);

    public function getSimpanan(array $data);

    public function ambilRiwayatTabungan(array $data);
}
