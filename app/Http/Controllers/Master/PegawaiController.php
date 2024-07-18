<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\StorePegawaiRequest;
use App\Http\Requests\Master\UpdatePegawaiRequest;
use App\Services\Master\PegawaiService;
use App\Services\Master\TokoService;
use App\Services\Master\ZonaWaktuService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PegawaiController extends Controller
{
    public function __construct(
        protected PegawaiService $pegawai,
        protected ZonaWaktuService $zonaWaktu,
        protected TokoService $toko,
    )
    {
    }
    public function index(Request $request)
    {
        return inertia('Master/Pegawai/Index', [
            'pegawais' => $this->pegawai->gatAllData($request->search, $request->perpage),
        ]);
    }

    public function create()
    {
        return inertia('Master/Pegawai/Tambah', [
            'zonaWaktus' => $this->zonaWaktu->get(['id', 'nama']),
            'tokos' => $this->toko->getTokosByUser(['id', 'nama']),
        ]);
    }

    public function store(StorePegawaiRequest $request)
    {
        $this->pegawai->create([
            'zonaWaktu' => $request->zonaWaktu,
            'email' => $request->email,
            'nama' => $request->nama,
            'password' => Hash::make($request->password),
            'toko' => $request->toko,
        ]);
        return to_route('pegawai.index')->with('success', 'Data berhasil ditambahkan');
    }

    public function show($id)
    {
        return back();
    }

    public function edit($id)
    {
        return inertia('Master/Pegawai/Ubah', [
            'pegawai' => $this->pegawai->find($id),
            'zonaWaktus' => $this->zonaWaktu->get(['id', 'nama']),
            'tokos' => $this->toko->getTokosByUser(['id', 'nama']),
        ]);
    }

    public function update(UpdatePegawaiRequest $request, $id)
    {
        $this->pegawai->update([
            'zonaWaktu' => $request->zonaWaktu,
            'email' => $request->email,
            'nama' => $request->nama,
            'password' => Hash::make($request->password),
            'toko' => $request->toko,
        ], $id);
        return to_route('pegawai.index')->with('success', 'Data berhasil diubah');
    }

    public function destroy($id)
    {
        $this->pegawai->delete($id);
        return to_route('pegawai.index')->with('success', 'Data berhasil dihapus');
    }
}
