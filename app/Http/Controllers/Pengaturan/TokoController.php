<?php

namespace App\Http\Controllers\Pengaturan;

use App\Http\Controllers\Controller;
use App\Services\Master\TokoService;
use App\Services\PengaturanService;
use Illuminate\Http\Request;

class TokoController extends Controller
{
    public function __construct(
        protected PengaturanService $pengaturan,
        protected TokoService $toko,
    ) {}
    public function edit($id)
    {
        return inertia('Pengaturan/Toko/Ubah', [
            'toko' => $this->toko->find($id),
        ]);
    }
    public function update(Request $request)
    {
        $request->validate([
            'id' => ['required', 'string'],
            'nama' => ['required', 'string'],
            'alamat' => ['required', 'string'],
            'logo' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:256'],
        ]);
        $toko = $this->toko->find($request->id);
        if ($request->hasFile('logo')) {
            $oldLogoPath = storage_path('app/public/logos/' . $toko->logo);
            if (file_exists($oldLogoPath)) {
                unlink($oldLogoPath);
                $file = $request->file('logo');
                $newFileName = fileName() . '.' . $file->getClientOriginalExtension();
                $file->storeAs('logos', $newFileName, 'public');
                $toko->update([
                    'nama' => $request->nama,
                    'alamat' => $request->alamat,
                    'logo' => $newFileName
                ]);
                return to_route('pengaturan.index')->with('success', 'Data berhasil diubah.');
            } else {
                return back()->with('error', 'File logo tidak ditemukan.');
            }
        } else {
            $toko->update([
                'nama' => $request->nama,
                'alamat' => $request->alamat,
            ]);
            return to_route('pengaturan.index')->with('success', 'Data berhasil diubah.');
        }
        return back()->with('error', 'Terjadi kesalahan pada saat penyimpanan data.');
    }
}
