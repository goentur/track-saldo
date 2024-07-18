<?php

namespace App\Repositories\Master\ZonaWaktu;

use App\Models\ZonaWaktu;

class ZonaWaktuRepository implements ZonaWaktuRepositoryInterface
{
    public function get(array $select)
    {
        return ZonaWaktu::select($select)->get();
    }

    public function gatAllData($search, $number)
    {
        return ZonaWaktu::search($search)->latest()->paginate($number ?? 25)->appends('query', null)->withQueryString();
    }

    public function create(array $data)
    {
        return ZonaWaktu::create($data);
    }

    public function find($id)
    {
        return ZonaWaktu::findOrFail($id);
    }

    public function update(array $data, $id)
    {
        $zonaWaktu = ZonaWaktu::findOrFail($id);
        $zonaWaktu->update($data);
        return $zonaWaktu;
    }

    public function delete($id)
    {
        $zonaWaktu = ZonaWaktu::findOrFail($id);
        $zonaWaktu->delete();
    }
}
