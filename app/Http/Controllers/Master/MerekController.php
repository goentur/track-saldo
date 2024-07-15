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
        protected TokoService $toko
    ) {
    }
    public function index(Request $request)
    {
        return inertia('Master/Merek/Index', [
            'mereks' => $this->merek->paginate($request->search, $request->perpage),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Master/Merek/Tambah', [
            'tokos' => $this->toko->getTokosByUser(['id', 'nama', 'alamat']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMerekRequest $request)
    {
        $this->merek->create([
            'toko_id' => $request->toko,
            'nama' => $request->nama,
        ]);
        return to_route('merek.index')->with('success', 'Data berhasil ditambahkan');
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
        return inertia('Master/Merek/Ubah', [
            'tokos' => $this->toko->getTokosByUser(['id', 'nama', 'alamat']),
            'merek' => $this->merek->find($id),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMerekRequest $request, $id)
    {
        $this->merek->update([
            'toko_id' => $request->toko,
            'nama' => $request->nama,
        ], $id);
        return to_route('merek.index')->with('success', 'Data berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $this->merek->delete($id);
        return to_route('merek.index')->with('success', 'Data berhasil dihapus');
    }
}
