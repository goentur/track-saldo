<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\StoreAnggotaRequest;
use App\Http\Requests\Master\UpdateAnggotaRequest;
use App\Services\Master\AnggotaService;
use App\Services\Master\TokoService;
use Illuminate\Http\Request;

class AnggotaController extends Controller
{
    public function __construct(
        protected AnggotaService $anggota,
        protected TokoService $toko
    ) {
    }
    public function index(Request $request)
    {
        return inertia('Master/Anggota/Index', [
            'anggotas' => $this->anggota->gatAllData($request->search, $request->perpage),
        ]);
    }
    
    public function create()
    {
        return inertia('Master/Anggota/Tambah', [
            'tokos' => $this->toko->getTokosByUser(['id', 'nama']),
        ]);
    }
    
    public function store(StoreAnggotaRequest $request)
    {
        $this->anggota->create([
            'toko_id' => $request->toko,
            'nama' => $request->nama,
            'telp' => '0' . $request->telp,
            'alamat' => $request->alamat,
        ]);
        return to_route('anggota.index')->with('success', 'Data berhasil ditambahkan');
    }
    
    public function show($id)
    {
        return back();
    }
    
    public function edit($id)
    {
        return inertia('Master/Anggota/Ubah', [
            'tokos' => $this->toko->getTokosByUser(['id', 'nama']),
            'anggota' => $this->anggota->find($id),
        ]);
    }
    
    public function update(UpdateAnggotaRequest $request, $id)
    {
        $this->anggota->update([
            'toko_id' => $request->toko,
            'nama' => $request->nama,
            'telp' => '0' . $request->telp,
            'alamat' => $request->alamat,
        ], $id);
        return to_route('anggota.index')->with('success', 'Data berhasil diubah');
    }

    public function destroy($id)
    {
        $this->anggota->delete($id);
        return to_route('anggota.index')->with('success', 'Data berhasil dihapus');
    }

    public function dataByToko(Request $request)
    {
        $request->validate([
            'toko' => ['required', 'uuid'],
        ]);
        return response()->json($this->anggota->getWhere(['id', 'nama', 'alamat'], ['toko_id' => $request->toko]), 200);
    }
}
