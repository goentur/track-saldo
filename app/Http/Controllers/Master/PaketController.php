<?php

namespace App\Http\Controllers\Master;

use App\Enums\TipePaket;
use App\Http\Controllers\Controller;
use App\Http\Requests\Master\StorePaketRequest;
use App\Http\Requests\Master\UpdatePaketRequest;
use App\Services\Master\PaketService;
use App\Services\Master\TokoService;
use Illuminate\Http\Request;

class PaketController extends Controller
{
    public function __construct(
        protected PaketService $paket,
        protected TokoService $toko,
    ) {
    }
    public function index(Request $request)
    {
        return inertia('Master/Paket/Index', [
            'pakets' => $this->paket->gatAllData($request->search, $request->perpage),
        ]);
    }

    public function create()
    {
        return inertia('Master/Paket/Tambah', [
            'tokos' => $this->toko->getTokosByUser(['id', 'nama']),
        ]);
    }

    public function store(StorePaketRequest $request)
    {
        $this->paket->create([
            'toko_id' => $request->toko,
            'tipe' => $request->tipePaket,
            'nama' => $request->nama,
            'harga' => $request->nominal,
        ]);
        return to_route('paket.index')->with('success', 'Data berhasil ditambahkan');
    }

    public function show($id)
    {
        return back();
    }

    public function edit($id)
    {
        return inertia('Master/Paket/Ubah', [
            'tokos' => $this->toko->getTokosByUser(['id', 'nama']),
            'paket' => $this->paket->find($id),
        ]);
    }

    public function update(UpdatePaketRequest $request, $id)
    {
        $this->paket->update([
            'toko_id' => $request->toko,
            'nama' => $request->nama,
            'harga' => $request->nominal,
        ], $id);
        return to_route('paket.index')->with('success', 'Data berhasil diubah');
    }

    public function destroy($id)
    {
        $this->paket->delete($id);
        return to_route('paket.index')->with('success', 'Data berhasil dihapus');
    }

    public function pulsaByToko(Request $request)
    {
        $request->validate([
            'toko' => ['required', 'uuid'],
        ]);
        $data = $this->paket->getWhere(['id', 'nama', 'harga'], ['toko_id' => $request->toko, 'tipe' => TipePaket::PULSA]);
        $datas = [];
        foreach ($data as $d) {
            $datas[] = [
                'id' => $d->id,
                'nama' => $d->nama,
                'harga' => 'Rp ' . rupiah($d->harga),
            ];
        }
        return response()->json($datas, 200);
    }
}
