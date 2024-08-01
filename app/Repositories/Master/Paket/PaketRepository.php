<?php

namespace App\Repositories\Master\Paket;

use App\Models\Paket;

class PaketRepository implements PaketRepositoryInterface
{
    public function gatAllData($search, $number)
    {
        $tokoId = [];
        foreach (auth()->user()->toko as $toko) {
            $tokoId[] = $toko->id;
        }
        return Paket::with('toko')->where('nama', 'like', '%' . $search . '%')
            ->orWhereHas('toko', function ($query) use ($search) {
                $query->where('nama', 'like', '%' . $search . '%');
            })
            ->whereIn('toko_id', $tokoId)
            ->paginate($number ?? 25)
            ->appends('query', null)
            ->withQueryString();
    }

    public function create(array $data)
    {
        return Paket::create($data);
    }

    public function find($id)
    {
        return Paket::findOrFail($id);
    }

    public function update(array $data, $id)
    {
        $anggota = Paket::findOrFail($id);
        $anggota->update($data);
        return $anggota;
    }

    public function delete($id)
    {
        $anggota = Paket::findOrFail($id);
        $anggota->delete();
    }

    public function getWhere(array $select, array $data)
    {
        return Paket::select($select)->where($data)->get();
    }
}
