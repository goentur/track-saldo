<?php

namespace App\Repositories\Master\Merek;

use App\Models\Merek;

class MerekRepository implements MerekRepositoryInterface
{
    public function gatAllData($search, $number)
    {
        $tokoId = auth()->user()->toko->pluck('id')->toArray();
        return Merek::with('toko')
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
        return Merek::create($data);
    }

    public function find($id)
    {
        return Merek::findOrFail($id);
    }

    public function update(array $data, $id)
    {
        $merek = Merek::findOrFail($id);
        $merek->update($data);
        return $merek;
    }

    public function delete($id)
    {
        $merek = Merek::findOrFail($id);
        $merek->delete();
    }

    public function getWhere(array $select, array $where)
    {
        return Merek::select($select)->where($where)->get();
    }

    public function getMereksByToko(array $select)
    {
        $merekId = [];
        foreach (auth()->user()->toko as $toko) {
            foreach ($toko->merek as $merek) {
                $merekId[] = $merek->id;
            }
        }
        return Merek::with('toko')->select($select)->whereIn('id', $merekId)->get();
    }
}
