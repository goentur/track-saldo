<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\StoreZonaWaktuRequest;
use App\Http\Requests\Master\UpdateZonaWaktuRequest;
use App\Services\Master\ZonaWaktuService;
use Illuminate\Http\Request;

class ZonaWaktuController extends Controller
{
    public function __construct(
        protected ZonaWaktuService $zonaWaktu,
    )
    {
    }
    public function index(Request $request)
    {
        return inertia('Master/ZonaWaktu/Index', [
            'zonaWaktus' => $this->zonaWaktu->gatAllData($request->search, $request->perpage),
        ]);
    }

    public function create()
    {
        return inertia('Master/ZonaWaktu/Tambah');
    }

    public function store(StoreZonaWaktuRequest $request)
    {
        $this->zonaWaktu->create([
            'nama' => $request->nama,
            'singkatan' => $request->singkatan,
            'gmt_offset' => $request->gmt_offset,
        ]);
        return to_route('master.zona-waktu.index')->with('success', 'Data berhasil ditambahkan');
    }

    public function show($id)
    {
        return back();
    }

    public function edit($id)
    {
        return inertia('Master/ZonaWaktu/Ubah', ['zonaWaktu' => $this->zonaWaktu->find($id)]);
    }

    public function update(UpdateZonaWaktuRequest $request, $id)
    {
        $this->zonaWaktu->update([
            'nama' => $request->nama,
            'singkatan' => $request->singkatan,
            'gmt_offset' => $request->gmt_offset,
        ], $id);
        return to_route('master.zona-waktu.index')->with('success', 'Data berhasil diubah');
    }

    public function destroy($id)
    {
        $this->zonaWaktu->delete($id);
        return to_route('master.zona-waktu.index')->with('success', 'Data berhasil dihapus');
    }
}
