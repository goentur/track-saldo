<?php

namespace App\Http\Controllers\Admin\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Master\StoreMerekRequest;
use App\Http\Requests\Admin\Master\UpdateMerekRequest;
use App\Models\Merek;
use App\Services\Admin\Master\MerekService;
use Illuminate\Http\Request;

class MerekController extends Controller
{
    public function __construct(protected MerekService $merek)
    {
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
        return inertia('Master/Merek/Tambah');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMerekRequest $request)
    {
        $this->merek->create([
            'nama' => $request->nama
        ]);
        return to_route('merek.index')->with('success', 'Data berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Merek $id)
    {
        return back();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return inertia('Master/Merek/Ubah', ['merek' => $this->merek->find($id)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMerekRequest $request, $id)
    {
        $this->merek->update([
            'nama' => $request->nama
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
