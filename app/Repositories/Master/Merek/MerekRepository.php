<?php

namespace App\Repositories\Master\Merek;

use App\Models\Merek;

class MerekRepository implements MerekRepositoryInterface
{
    public function all()
    {
        return Merek::latest()->all();
    }
    public function paginate($search, $number)
    {
        $tokoId = [];
        foreach (auth()->user()->toko as $toko) {
            $tokoId[] = $toko->id;
        }
        return Merek::with('toko')->where('nama', 'like', '%' . $search . '%')
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
        return Merek::create($data);
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
}
