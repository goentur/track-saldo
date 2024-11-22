<?php

namespace App\Repositories\Master\Anggota;

use App\Enums\KeteranganTransferDetail;
use App\Enums\StatusSimpananAnggota;
use App\Enums\TipeSimpananAnggota;
use App\Enums\TipeTransaksi;
use App\Models\Anggota;
use App\Models\SimpananAnggota;
use App\Models\TransaksiDetail;

class AnggotaRepository implements AnggotaRepositoryInterface
{
    public function gatAllData($request, $rule)
    {
        if ($rule) {
            if ($rule['simpanan'] == TipeSimpananAnggota::TABUNGAN) {
                $query = Anggota::with('tabungan')->whereIn('toko_id', [$request->toko]);
            }
            if ($rule['simpanan'] == TipeSimpananAnggota::INVESTASI) {
                $query = Anggota::with('investasi')->whereIn('toko_id', [$request->toko]);
            }
        } else {
            $query = Anggota::whereIn('toko_id', [$request->toko]);
        }
        if ($request->search) {
            $query->where('nama', 'like', '%' . $request->search . '%')
                ->orWhere('telp', 'like', '%' . $request->search . '%')
                ->orWhere('alamat', 'like', '%' . $request->search . '%');
        }
        return $query->latest()->paginate($request->perPage ?? 25);
    }

    public function create(array $data)
    {
        return Anggota::create($data);
    }

    public function find($id)
    {
        return Anggota::findOrFail($id);
    }

    public function update(array $data, $id)
    {
        $anggota = Anggota::findOrFail($id);
        $anggota->update($data);
        return $anggota;
    }

    public function delete($id)
    {
        $anggota = Anggota::findOrFail($id);
        $anggota->delete();
    }

    public function getWhere(array $select, array $data)
    {
        return Anggota::select($select)->where($data)->latest()->get();
    }

    public function getAnggotasByUser(array $select)
    {
        $tokoId = [];
        foreach (auth()->user()->toko as $toko) {
            $tokoId[] = $toko->id;
        }
        return Anggota::with('toko')->select($select)->whereIn('toko_id', $tokoId)->get();
    }
    public function updatePoin(array $data)
    {
        $anggota = Anggota::findOrFail($data['anggota']);
        if ($data['aksi'] == 'menambahkan') {
            $anggota->update(['poin' => $anggota->poin + persenNominal($data['nominal'], 10)]);
        }
        if ($data['aksi'] == 'mengurangi') {
            $anggota->update(['poin' => $anggota->poin - $data['nominal']]);
        }
        return $anggota;
    }
    public function updateOrCreateSimpanan(array $data)
    {
        if ($data['tipe'] == TipeTransaksi::INVESTASI) {
            $simpananAnggota = SimpananAnggota::create([
                'anggota_id' => $data['anggota'],
                'nominal' => $data['nominal'],
                'tipe' => $data['tipe'],
                'tanggal_pengambilan' => now()->addDays(30)->timestamp,
                'status' => StatusSimpananAnggota::MENUNGGU,
            ]);
        } else {
            $simpananAnggota = SimpananAnggota::select('id', 'nominal')->where(['anggota_id' => $data['anggota'], 'tipe' => $data['tipe']])->first();
            if ($simpananAnggota) {
                if ($data['aksi'] == 'menambahkan') {
                    $simpananAnggota->update([
                        'nominal' => $simpananAnggota->nominal + $data['nominal'],
                    ]);
                } else if ($data['aksi'] == 'mengurangi') {
                    $simpananAnggota->update([
                        'nominal' => $simpananAnggota->nominal - $data['nominal'],
                    ]);
                }
            } else {
                $simpananAnggota = SimpananAnggota::create([
                    'anggota_id' => $data['anggota'],
                    'nominal' => $data['nominal'],
                    'tipe' => $data['tipe'],
                ]);
            }
        }

        return $simpananAnggota;
    }
    public function getSimpanan(array $data)
    {
        return SimpananAnggota::with('anggota')->select('id', 'anggota_id', 'nominal')->where(['anggota_id' => $data['anggota'], 'tipe' => $data['tipe']])->first();
    }
    public function ambilRiwayatTabungan(array $data)
    {
        return TransaksiDetail::with('transaksi')->select('id', 'transaksi_id', 'nominal', 'keterangan')->whereHas('transaksi', function ($query) use ($data) {
            $query->where('anggota_id', $data['anggota'])
            ->where('tipe', TipeTransaksi::TABUNGAN);
        })->whereIn('keterangan', [KeteranganTransferDetail::NOMINAL_SETORAN, KeteranganTransferDetail::NOMINAL_PENARIKAN])->latest()->limit(10)->get();
    }
}
