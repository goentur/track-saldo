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
            'anggotas' => $this->anggota->paginate($request->search, $request->perpage),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Master/Anggota/Tambah', [
            'tokos' => $this->toko->getTokosByUser(['id', 'nama', 'alamat']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAnggotaRequest $request)
    {
        $this->anggota->create([
            'toko_id' => $request->toko,
            'nama' => $request->nama,
            'telp' => $request->telp,
            'alamat' => $request->alamat,
        ]);
        return to_route('anggota.index')->with('success', 'Data berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return back();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return inertia('Master/Anggota/Ubah', [
            'tokos' => $this->toko->getTokosByUser(['id', 'nama', 'alamat']),
            'anggota' => $this->anggota->find($id),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAnggotaRequest $request, $id)
    {
        $this->anggota->update([
            'toko_id' => $request->toko,
            'nama' => $request->nama,
            'telp' => $request->telp,
            'alamat' => $request->alamat,
        ], $id);
        return to_route('anggota.index')->with('success', 'Data berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $this->anggota->delete($id);
        return to_route('anggota.index')->with('success', 'Data berhasil dihapus');
    }
}
