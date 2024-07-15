<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\StorePegawaiRequest;
use App\Http\Requests\Master\UpdatePegawaiRequest;
use App\Services\Master\PegawaiService;
use App\Services\Master\TokoService;
use App\Services\Master\ZonaWaktuService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PegawaiController extends Controller
{
    public function __construct(protected PegawaiService $pegawai, protected ZonaWaktuService $zonaWaktu, protected TokoService $toko)
    {
    }
    public function index(Request $request)
    {
        return inertia('Master/Pegawai/Index', [
            'pegawais' => $this->pegawai->paginate($request->search, $request->perpage),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Master/Pegawai/Tambah', [
            'zonaWaktus' => $this->zonaWaktu->get(['id', 'nama', 'singkatan']),
            'tokos' => $this->toko->getTokosByUser(['id', 'nama', 'alamat']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePegawaiRequest $request)
    {
        $this->pegawai->create([
            'zonaWaktu' => $request->zonaWaktu,
            'email' => $request->email,
            'nama' => $request->nama,
            'password' => Hash::make($request->password),
            'toko' => $request->toko,
        ]);
        return to_route('pegawai.index')->with('success', 'Data berhasil ditambahkan');
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
        return inertia('Master/Pegawai/Ubah', [
            'pegawai' => $this->pegawai->find($id),
            'zonaWaktus' => $this->zonaWaktu->get(['id', 'nama', 'singkatan']),
            'tokos' => $this->toko->getTokosByUser(['id', 'nama', 'alamat']),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePegawaiRequest $request, $id)
    {
        $this->pegawai->update([
            'zonaWaktu' => $request->zonaWaktu,
            'email' => $request->email,
            'nama' => $request->nama,
            'password' => Hash::make($request->password),
            'toko' => $request->toko,
        ], $id);
        return to_route('pegawai.index')->with('success', 'Data berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $this->pegawai->delete($id);
        return to_route('pegawai.index')->with('success', 'Data berhasil dihapus');
    }
}
