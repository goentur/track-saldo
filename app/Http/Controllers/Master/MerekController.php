<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\StoreMerekRequest;
use App\Http\Requests\Master\UpdateMerekRequest;
use App\Services\Master\MerekService;
use App\Services\Master\TokoService;
use Illuminate\Http\Request;

class MerekController extends Controller
{
    public function __construct(
        protected MerekService $merek,
        protected TokoService $toko,
    ) {
    }
    public function index(Request $request)
    {
        return inertia('Master/Merek/Index', [
            'mereks' => $this->merek->gatAllData($request->search, $request->perpage),
        ]);
    }
    
    public function create()
    {
        return inertia('Master/Merek/Tambah', [
            'tokos' => $this->toko->getTokosByUser(['id', 'nama']),
        ]);
    }
    
    public function store(StoreMerekRequest $request)
    {
        $this->merek->create([
            'toko_id' => $request->toko,
            'nama' => $request->nama,
        ]);
        return to_route('merek.index')->with('success', 'Data berhasil ditambahkan');
    }
    
    public function show($id)
    {
        return back();
    }
    
    public function edit($id)
    {
        return inertia('Master/Merek/Ubah', [
            'tokos' => $this->toko->getTokosByUser(['id', 'nama']),
            'merek' => $this->merek->find($id),
        ]);
    }
    
    public function update(UpdateMerekRequest $request, $id)
    {
        $this->merek->update([
            'toko_id' => $request->toko,
            'nama' => $request->nama,
        ], $id);
        return to_route('merek.index')->with('success', 'Data berhasil diubah');
    }
    
    public function destroy($id)
    {
        $this->merek->delete($id);
        return to_route('merek.index')->with('success', 'Data berhasil dihapus');
    }
    public function dataByToko(Request $request)
    {
        $request->validate([
            'toko' => ['required', 'numeric'],
        ]);
        return response()->json($this->merek->getWhere(['id', 'nama'], ['toko_id' => $request->toko]), 200);
    }
}
