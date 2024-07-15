<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\StorePemilikRequest;
use App\Http\Requests\Master\UpdatePemilikRequest;
use App\Services\Master\PemilikService;
use App\Services\Master\TokoService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PemilikController extends Controller
{
    public function __construct(protected PemilikService $pemilik, protected TokoService $toko)
    {
    }
    public function index(Request $request)
    {
        return inertia('Master/Pemilik/Index', [
            'pemiliks' => $this->pemilik->paginate($request->search, $request->perpage),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Master/Pemilik/Tambah', [
            'tokos' => $this->toko->get(['id', 'nama', 'alamat']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePemilikRequest $request)
    {
        $this->pemilik->create([
            'email' => $request->email,
            'nama' => $request->nama,
            'password' => Hash::make($request->password),
            'toko' => $request->toko,
        ]);
        return to_route('pemilik.index')->with('success', 'Data berhasil ditambahkan');
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
        return inertia('Master/Pemilik/Ubah', [
            'tokos' => $this->toko->get(['id', 'nama', 'alamat']),
            'pemilik' => $this->pemilik->find($id),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePemilikRequest $request, $id)
    {
        $this->pemilik->update([
            'nama' => $request->nama,
            'alamat' => $request->alamat,
        ], $id);
        return to_route('pemilik.index')->with('success', 'Data berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $this->pemilik->delete($id);
        return to_route('pemilik.index')->with('success', 'Data berhasil dihapus');
    }
}
