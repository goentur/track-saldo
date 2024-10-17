<?php

namespace App\Repositories\Master\Tabungan;

use App\Models\Tabungan;

class TabunganRepository implements TabunganRepositoryInterface
{
    public function gatAllData($search, $number)
    {
        $tokoId = auth()->user()->toko->pluck('id')->toArray();
        return Tabungan::with('toko', 'merek')->where(function ($query) use ($tokoId, $search) {
            $query->whereIn('toko_id', $tokoId);
        })->orWhereHas('toko', function ($query) use ($tokoId, $search) {
            $query->whereIn('id', $tokoId)
                ->where('nama', 'like', '%' . $search . '%');
        })->orWhereHas('merek', function ($query) use ($tokoId, $search) {
            $query->whereIn('toko_id', $tokoId)
                ->where('nama', 'like', '%' . $search . '%');
        })->orderBy('updated_at', 'desc')
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

    public function getTabungansByToko($with, $select, $where, $transaksi)
    {
        $tabungan = Tabungan::with($with)->select($select)->where($where);
        if ($transaksi) {
            $tabungan->orderBy('updated_at', 'desc')->limit(19);
        }
        return $tabungan->get(); 
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
