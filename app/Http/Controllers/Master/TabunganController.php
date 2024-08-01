<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\StoreTabunganRequest;
use App\Http\Requests\Master\UpdateTabunganRequest;
use App\Services\Master\MerekService;
use App\Services\Master\TabunganService;
use App\Services\Master\TokoService;
use Illuminate\Http\Request;

class TabunganController extends Controller
{
    public function __construct(
        protected TabunganService $tabungan,
        protected TokoService $toko,
        protected MerekService $merek,
    ) {
    }
    public function index(Request $request)
    {
        return inertia('Master/Tabungan/Index', [
            'tabungans' => $this->tabungan->gatAllData($request->search, $request->perpage),
        ]);
    }
    
    public function create()
    {
        return inertia('Master/Tabungan/Tambah', [
            'mereks' => $this->merek->getMereksByToko(['id', 'toko_id', 'nama']),
        ]);
    }
    
    public function store(StoreTabunganRequest $request)
    {
        $this->tabungan->create([
            'toko_id' => $request->toko,
            'merek_id' => $request->merek,
            'no' => $request->no,
            'nominal' => $request->nominal,
        ]);
        return to_route('tabungan.index')->with('success', 'Data berhasil ditambahkan');
    }
    
    public function show($id)
    {
        return back();
    }
    
    public function edit($id)
    {
        return inertia('Master/Tabungan/Ubah', [
            'mereks' => $this->merek->getMereksByToko(['id', 'toko_id', 'nama']),
            'tabungan' => $this->tabungan->find($id),
        ]);
    }
    
    public function update(UpdateTabunganRequest $request, $id)
    {
        $this->tabungan->update([
            'toko_id' => $request->toko,
            'merek_id' => $request->merek,
            'no' => $request->no,
            'nominal' => $request->nominal,
        ], $id);
        return to_route('tabungan.index')->with('success', 'Data berhasil diubah');
    }
    
    public function destroy($id)
    {
        $this->tabungan->delete($id);
        return to_route('tabungan.index')->with('success', 'Data berhasil dihapus');
    }

    public function dataByToko(Request $request)
    {
        $request->validate([
            'toko' => ['required', 'uuid'],
        ]);
        return response()->json($this->tabungan->getWhere(['id', 'merek_id', 'no'], ['toko_id' => $request->toko]), 200);
    }
}
