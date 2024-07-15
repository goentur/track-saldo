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
            'tabungans' => $this->tabungan->paginate($request->search, $request->perpage),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Master/Tabungan/Tambah', [
            'mereks' => $this->merek->getMereksByToko(['id', 'toko_id', 'nama']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
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
        return inertia('Master/Tabungan/Ubah', [
            'mereks' => $this->merek->getMereksByToko(['id', 'toko_id', 'nama']),
            'tabungan' => $this->tabungan->find($id),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTabunganRequest $request, $id)
    {
        $this->tabungan->update([
            'toko_id' => $request->toko,
            'nama' => $request->nama,
            'telp' => $request->telp,
            'alamat' => $request->alamat,
        ], $id);
        return to_route('tabungan.index')->with('success', 'Data berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $this->tabungan->delete($id);
        return to_route('tabungan.index')->with('success', 'Data berhasil dihapus');
    }
}
