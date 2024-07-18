<?php

namespace App\Repositories\Master\Pegawai;

use App\Models\User;

class PegawaiRepository implements PegawaiRepositoryInterface
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
                $query->where('name', 'pegawai');
            })
            ->paginate($number ?? 25)
            ->appends('query', null)
            ->withQueryString();
    }

    public function create(array $data)
    {
        $user = User::create([
            'zona_waktu_id' => $data['zonaWaktu'],
            'email' => $data['email'],
            'name' => $data['nama'],
            'password' => $data['password'],
        ]);
        $user->assignRole('pegawai');
        $user->toko()->sync($data['toko']);
    }

    public function find($id)
    {
        return User::with('zonaWaktu', 'toko')->findOrFail($id);
    }

    public function update(array $data, $id)
    {
        $pegawai = User::findOrFail($id);
        $pegawai->update([
            'zona_waktu_id' => $data['zonaWaktu'],
            'email' => $data['email'],
            'name' => $data['nama'],
            'password' => $data['password'],
        ]);
        $pegawai->toko()->sync($data['toko']);
        return $pegawai;
    }

    public function delete($id)
    {
        $pegawai = User::findOrFail($id);
        $pegawai->delete();
    }
}
