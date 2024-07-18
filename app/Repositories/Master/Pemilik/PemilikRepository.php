<?php

namespace App\Repositories\Master\Pemilik;

use App\Models\User;

class PemilikRepository implements PemilikRepositoryInterface
{
    public function gatAllData($search, $number)
    {
        return User::with('zonaWaktu', 'toko')
            ->where(function ($query) use ($search) {
                $query->where('email', 'like', '%' . $search . '%')
                    ->orWhere('name', 'like', '%' . $search . '%')
                    ->orWhereHas('toko', function ($query) use ($search) {
                        $query->where('nama', 'like', '%' . $search . '%');
                    });
            })
            ->whereHas('roles', function ($query) {
                $query->where('name', 'pemilik');
            })
            ->paginate($number ?? 25)
            ->appends('query', null)
            ->withQueryString();
    }

    public function create(array $data)
    {
        $user = User::create(['zona_waktu_id' => $data['zonaWaktu'],
            'email' => $data['email'],
            'name' => $data['nama'],
            'password' => $data['password'],
        ]);
        $user->assignRole('pemilik');
        $user->toko()->sync($data['toko']);
    }

    public function find($id)
    {
        return User::with('toko')->findOrFail($id);
    }

    public function update(array $data, $id)
    {
        $pemilik = User::findOrFail($id);
        $pemilik->update($data);
        return $pemilik;
    }

    public function delete($id)
    {
        $pemilik = User::findOrFail($id);
        $pemilik->delete();
    }
}
