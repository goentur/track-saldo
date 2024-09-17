<?php

namespace App\Repositories\Master\Toko;

use App\Models\Toko;

class TokoRepository implements TokoRepositoryInterface
{
    public function get(array $select)
    {
        return Toko::select($select)->get();
    }

    public function gatAllData($search, $number)
    {
        return Toko::search($search)->latest()->paginate($number ?? 25)->appends('query', null)->withQueryString();
    }

    public function create(array $data)
    {
        return Toko::create($data);
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

    public function getTokosByUser(array $select)
    {
        $user = auth()->user();
        $tokoId = $user->toko->pluck('id')->toArray();
        return Toko::select($select)->whereIn('id', $tokoId)->get();
    }
}
