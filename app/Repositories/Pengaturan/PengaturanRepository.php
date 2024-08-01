<?php

namespace App\Repositories\Pengaturan;

use App\Models\Pengaturan;

class PengaturanRepository implements PengaturanRepositoryInterface
{
    public function getPengaturanByToko(array $select, $tipe)
    {
        $tokoId = [];
        foreach (auth()->user()->toko as $toko) {
            $tokoId[] = $toko->id;
        }
        return Pengaturan::with('user', 'toko', 'tabungan')->select($select)->whereIn('toko_id', $tokoId)->where('tipe', $tipe)->orderBy('toko_id')->get();
    }
    public function getWhere(array $select, array $where)
    {
        return Pengaturan::select($select)->where($where)->get();
    }
    public function getWhereOne(array $select, array $where)
    {
        return Pengaturan::select($select)->where($where)->first();
    }
    public function simpan(array $data)
    {
        return Pengaturan::create($data);
    }
    public function update(array $data, $id)
    {
        $pengaturan = Pengaturan::findOrFail($id);
        $pengaturan->update($data);
        return $pengaturan;
    }
}
