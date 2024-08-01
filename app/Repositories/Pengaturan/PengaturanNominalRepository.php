<?php

namespace App\Repositories\Pengaturan;

use App\Enums\TipePengaturanNominal;
use App\Models\PengaturanNominal;

class PengaturanNominalRepository implements PengaturanNominalRepositoryInterface
{
    public function getPengaturanNominalByToko(array $select, $tipe)
    {
        $tokoId = [];
        foreach (auth()->user()->toko as $toko) {
            $tokoId[] = $toko->id;
        }
        return PengaturanNominal::with('user', 'toko')->select($select)->whereIn('toko_id', $tokoId)->where('tipe', $tipe)->orderBy('toko_id')->get();
    }
    public function getWhere(array $select, array $where)
    {
        return PengaturanNominal::select($select)->where($where)->get();
    }
    public function getWhereOne(array $select, array $where)
    {
        return PengaturanNominal::select($select)->where($where)->first();
    }
    public function simpan(array $data)
    {
        return PengaturanNominal::create($data);
    }
    public function update(array $data, $id)
    {
        $pengaturan = PengaturanNominal::findOrFail($id);
        $pengaturan->update($data);
        return $pengaturan;
    }
}
