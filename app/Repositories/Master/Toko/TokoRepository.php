<?php

namespace App\Repositories\Master\Toko;

use App\Models\Toko;

class TokoRepository implements TokoRepositoryInterface
{
    public function get(array $selected)
    {
        return Toko::select($selected)->get();
    }
    public function paginate($search, $number)
    {
        return Toko::search($search)->latest()->paginate($number ?? 25)->appends('query', null)->withQueryString();
    }

    public function create(array $data)
    {
        return Toko::create($data);
    }

    public function where(array $data)
    {
        return Toko::where($data)->get();
    }
    public function getTokosByUser(array $select)
    {
        $tokoId = [];
        foreach (auth()->user()->toko as $toko) {
            $tokoId[] = $toko->id;
        }
        return Toko::select($select)->whereIn('id', $tokoId)->get();
    }

    public function find($id)
    {
        return Toko::findOrFail($id);
    }

    public function update(array $data, $id)
    {
        $toko = Toko::findOrFail($id);
        $toko->update($data);
        return $toko;
    }

    public function delete($id)
    {
        $toko = Toko::findOrFail($id);
        $toko->delete();
    }
}
