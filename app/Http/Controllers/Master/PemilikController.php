<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\StorePemilikRequest;
use App\Http\Requests\Master\UpdatePemilikRequest;
use App\Services\Master\PemilikService;
use App\Services\Master\TokoService;
use App\Services\Master\ZonaWaktuService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PemilikController extends Controller
{
    public function __construct(
        protected ZonaWaktuService $zonaWaktu,
        protected TokoService $toko,
        protected PemilikService $pemilik,
    )
    {
    }
    public function index(Request $request)
    {
        return inertia('Master/Pemilik/Index', [
            'pemiliks' => $this->pemilik->gatAllData($request->search, $request->perpage),
        ]);
    }

    public function create()
    {
        return inertia('Master/Pemilik/Tambah', [
            'zonaWaktus' => $this->zonaWaktu->get(['id', 'nama']),
            'tokos' => $this->toko->get(['id', 'nama']),
        ]);
    }

    public function store(StorePemilikRequest $request)
    {
        $this->pemilik->create(['zonaWaktu' => $request->zonaWaktu,
            'email' => $request->email,
            'nama' => $request->nama,
            'password' => Hash::make($request->password),
            'toko' => $request->toko,
        ]);
        return to_route('master.pemilik.index')->with('success', 'Data berhasil ditambahkan');
    }

    public function show($id)
    {
        return back();
    }

    public function edit($id)
    {
        return inertia('Master/Pemilik/Ubah', [
            'zonaWaktus' => $this->zonaWaktu->get(['id', 'nama']),
            'tokos' => $this->toko->get(['id', 'nama']),
            'pemilik' => $this->pemilik->find($id),
        ]);
    }

    public function update(UpdatePemilikRequest $request, $id)
    {
        $this->pemilik->update([
            'nama' => $request->nama,
            'alamat' => $request->alamat,
        ], $id);
        return to_route('master.pemilik.index')->with('success', 'Data berhasil diubah');
    }

    public function destroy($id)
    {
        $this->pemilik->delete($id);
        return to_route('master.pemilik.index')->with('success', 'Data berhasil dihapus');
    }
}
