<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\StoreTokoRequest;
use App\Http\Requests\Master\UpdateTokoRequest;
use App\Services\Master\TokoService;
use Illuminate\Http\Request;

class TokoController extends Controller
{
    public function __construct(protected TokoService $toko)
    {
    }
    public function index(Request $request)
    {
        return inertia('Master/Toko/Index', [
            'tokos' => $this->toko->paginate($request->search, $request->perpage),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Master/Toko/Tambah');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTokoRequest $request)
    {
        $this->toko->create([
            'nama' => $request->nama,
            'alamat' => $request->alamat,
        ]);
        return to_route('toko.index')->with('success', 'Data berhasil ditambahkan');
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
        return inertia('Master/Toko/Ubah', ['toko' => $this->toko->find($id)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTokoRequest $request, $id)
    {
        $this->toko->update([
            'nama' => $request->nama,
            'alamat' => $request->alamat,
        ], $id);
        return to_route('toko.index')->with('success', 'Data berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $this->toko->delete($id);
        return to_route('toko.index')->with('success', 'Data berhasil dihapus');
    }
}
