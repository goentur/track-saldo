<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\StoreTokoRequest;
use App\Http\Requests\Master\UpdateTokoRequest;
use App\Services\Master\TokoService;
use Illuminate\Http\Request;

class TokoController extends Controller
{
    public function __construct(
        protected TokoService $toko,
    )
    {
    }
    public function index(Request $request)
    {
        return inertia('Master/Toko/Index', [
            'tokos' => $this->toko->gatAllData($request->search, $request->perpage),
        ]);
    }
    
    public function create()
    {
        return inertia('Master/Toko/Tambah');
    }

    public function store(StoreTokoRequest $request)
    {
        $this->toko->create([
            'nama' => $request->nama,
            'alamat' => $request->alamat,
        ]);
        return to_route('toko.index')->with('success', 'Data berhasil ditambahkan');
    }

    public function show($id)
    {
        return back();
    }

    public function edit($id)
    {
        return inertia('Master/Toko/Ubah', ['toko' => $this->toko->find($id)]);
    }

    public function update(UpdateTokoRequest $request, $id)
    {
        $this->toko->update([
            'nama' => $request->nama,
            'alamat' => $request->alamat,
        ], $id);
        return to_route('toko.index')->with('success', 'Data berhasil diubah');
    }

    public function destroy($id)
    {
        $this->toko->delete($id);
        return to_route('toko.index')->with('success', 'Data berhasil dihapus');
    }
}
