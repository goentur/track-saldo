<?php

namespace App\Repositories\Master\Tabungan;

use App\Models\Tabungan;

class TabunganRepository implements TabunganRepositoryInterface
{
    public function gatAllData($search, $number)
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

    public function getWhere(array $select, array $data)
    {
        return Tabungan::with('merek')->select($select)->where($data)->get();
    }

    public function getTabungansByToko(array $select)
    {
        $tokoId = [];
        foreach (auth()->user()->toko as $toko) {
            $tokoId[] = $toko->id;
        }
        return Tabungan::with('toko', 'merek')->select($select)->whereIn('toko_id', $tokoId)->orderBy('toko_id')->get();
    }

    public function updateNominal(array $data)
    {
        $tabungan = Tabungan::findOrFail($data['tabungan']);
        if ($data['tipe'] == 'menambahkan') {
            $nominal = $tabungan->nominal + $data['nominal'];
        } else if ($data['tipe'] == 'mengurangi') {
            $nominal = $tabungan->nominal - $data['nominal'];
        }
        $tabungan->update([
            'nominal' => $nominal,
        ]);
        return $tabungan;
    }
}
