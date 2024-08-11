<?php

namespace App\Http\Controllers\Laporan;

use App\Http\Controllers\Controller;
use App\Http\Requests\LaporanRequest;
use App\Services\LaporanService;
use App\Services\Master\TokoService;

class LaporanController extends Controller
{
    public function __construct(
        protected TokoService $toko,
        protected LaporanService $laporan,
    ) {}
    public function index()
    {
        return inertia('Laporan/Laporan/Index', [
            'tokos' => $this->toko->getTokosByUser(['id', 'nama']),
        ]);
    }
    public function transaksi(LaporanRequest $request)
    {
        $zonaWaktuPengguna = zonaWaktuPengguna();
        $tanggal = pecahTanggalRiwayat($request->tanggal, $zonaWaktuPengguna);
        $transaksi = $this->laporan->transaksi([
            'toko' => $request->toko,
            'tanggalAwal' => $tanggal['awal'],
            'tanggalAkhir' => $tanggal['akhir'],
        ]);
        $total = 0;
        $datas = [];
        foreach ($transaksi as $key => $value) {
            $valueTotal = $value->total;
            $total += $valueTotal;
            $datas[] = [
                'no' => ++$key,
                'tanggal' => formatTanggal($value->tanggal, $zonaWaktuPengguna),
                'pengguna' => $value->user?->name,
                'anggota' => $value->anggota?->nama,
                'total' => rupiah($valueTotal),
                'keterangan' => $value->tipe,
            ];
        }
        return response()->json([
            'tanggalAwal' => $tanggal['textTanggalAwal'],
            'tanggalAkhir' => $tanggal['textTanggalAkhir'],
            'total' => rupiah($total),
            'data' => $datas,
        ], 200);
    }
    public function detail()
    {
        return inertia('Laporan/LaporanDetail/Index', [
            'tokos' => $this->toko->getTokosByUser(['id', 'nama']),
        ]);
    }
    public function transaksiDetail(LaporanRequest $request)
    {
        $zonaWaktuPengguna = zonaWaktuPengguna();
        $tanggal = pecahTanggalRiwayat($request->tanggal, $zonaWaktuPengguna);
        $transaksi = $this->laporan->transaksiDetail([
            'toko' => $request->toko,
            'tanggalAwal' => $tanggal['awal'],
            'tanggalAkhir' => $tanggal['akhir'],
        ]);
        $total = 0;
        $datas = [];
        foreach ($transaksi as $key => $value) {
            $valueTotal = $value->total;
            $total += $valueTotal;
            $detail = [];
            foreach ($value->transaksiDetail as $d => $dv) {
                $detail[] = [
                    'id' => ++$d,
                    'merek' => $dv->tabungan?->merek?->nama,
                    'no' => $dv->tabungan?->no,
                    'nominal' => rupiah($dv->nominal),
                    'tipe' => $dv->tipe,
                    'keterangan' => $dv->keterangan,
                ];
            }
            $datas[] = [
                'no' => ++$key,
                'tanggal' => formatTanggal($value->tanggal, $zonaWaktuPengguna),
                'pengguna' => $value->user?->name,
                'anggota' => $value->anggota?->nama,
                'total' => rupiah($valueTotal),
                'keterangan' => $value->tipe,
                'detail' => $detail,
            ];
        }
        return response()->json([
            'tanggalAwal' => $tanggal['textTanggalAwal'],
            'tanggalAkhir' => $tanggal['textTanggalAkhir'],
            'total' => rupiah($total),
            'data' => $datas,
        ], 200);
    }
}
