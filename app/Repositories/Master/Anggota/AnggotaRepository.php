<?php

namespace App\Repositories\Master\Anggota;

use App\Models\Anggota;

class AnggotaRepository implements AnggotaRepositoryInterface
{
    public function gatAllData($search, $number)
    {
        $tokoId = auth()->user()->toko->pluck('id')->toArray();
        return Anggota::with('toko')
        ->where(function ($query) use ($tokoId, $search) {
            $query->whereIn('toko_id', $tokoId)
                ->where('nama', 'like', '%' . $search . '%');
        })
            ->orWhereHas('toko', function ($query) use ($tokoId, $search) {
                $query->whereIn('id', $tokoId)
                    ->where('nama', 'like', '%' . $search . '%');
            })
            ->paginate($number ?? 25)
            ->appends('query', null)
            ->withQueryString();
    }

    public function create(array $data)
    {
        return Anggota::create($data);
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

    public function getWhere(array $select, array $data)
    {
        return Anggota::select($select)->where($data)->get();
    }

    public function getAnggotasByUser(array $select)
    {
        $tokoId = [];
        foreach (auth()->user()->toko as $toko) {
            $tokoId[] = $toko->id;
        }
        return Anggota::with('toko')->select($select)->whereIn('toko_id', $tokoId)->get();
    }
    public function updatePoin(array $data)
    {
        $anggota = Anggota::findOrFail($data['anggota']);
        $point = (($data['nominal'] * 10) / 100) / 1000;
        $anggota->update([
            'poin' => $anggota->poin + $point,
        ]);
        return $anggota;
    }
}
