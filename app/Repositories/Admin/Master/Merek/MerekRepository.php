<?php

namespace App\Repositories\Admin\Master\Merek;

use App\Models\Merek;

class MerekRepository implements MerekRepositoryInterface
{
    public function all()
    {
        return Merek::latest()->all();
    }
    public function paginate($search, $number)
    {
        return Merek::search($search)->latest()->paginate($number ?? 25)->appends('query', null)->withQueryString();
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
}
