<?php

namespace App\Repositories\Master\Anggota;

use App\Models\Anggota;

class AnggotaRepository implements AnggotaRepositoryInterface
{
    public function all()
    {
        return Anggota::latest()->all();
    }
    public function paginate($search, $number)
    {
        $tokoId = [];
        foreach (auth()->user()->toko as $toko) {
            $tokoId[] = $toko->id;
        }
        return Anggota::with('toko')->where('nama', 'like', '%' . $search . '%')
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
        return Anggota::create($data);
    }

    public function getAnggotasByUser(array $select)
    {
        $tokoId = [];
        foreach (auth()->user()->toko as $toko) {
            $tokoId[] = $toko->id;
        }
        return Anggota::with('toko')->select($select)->whereIn('toko_id', $tokoId)->get();
    }

    public function find($id)
    {
        return Anggota::findOrFail($id);
    }

    public function update(array $data, $id)
    {
        $anggota = Anggota::findOrFail($id);
        $anggota->update($data);
        return $anggota;
    }

    public function delete($id)
    {
        $anggota = Anggota::findOrFail($id);
        $anggota->delete();
    }
}
