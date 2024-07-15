<?php

namespace App\Repositories\Master\Tabungan;

use App\Models\Tabungan;

class TabunganRepository implements TabunganRepositoryInterface
{
    public function all()
    {
        return Tabungan::latest()->all();
    }
    public function paginate($search, $number)
    {
        $tokoId = [];
        foreach (auth()->user()->toko as $toko) {
            $tokoId[] = $toko->id;
        }
        return Tabungan::with('toko', 'merek')
            ->where('no', 'like', '%' . $search . '%')
            ->orWhereHas('toko', function ($query) use ($search) {
                $query->where('nama', 'like', '%' . $search . '%');
            })
            ->orWhereHas('merek', function ($query) use ($search) {
                $query->where('nama', 'like', '%' . $search . '%');
            })
            ->whereIn('toko_id', $tokoId)
            ->paginate($number ?? 25)
            ->appends('query', null)
            ->withQueryString();
    }

    public function create(array $data)
    {
        return Tabungan::create($data);
    }

    public function where(array $data)
    {
        return Tabungan::where($data)->get();
    }

    public function find($id)
    {
        return Tabungan::findOrFail($id);
    }

    public function update(array $data, $id)
    {
        $tabungan = Tabungan::findOrFail($id);
        $tabungan->update($data);
        return $tabungan;
    }

    public function delete($id)
    {
        $tabungan = Tabungan::findOrFail($id);
        $tabungan->delete();
    }
}
