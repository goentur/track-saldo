<?php

namespace App\Http\Controllers;

use App\Enums\KeteranganTransferDetail;
use App\Enums\TipePengaturan;
use App\Enums\TipeTransaksi;
use App\Enums\TipeTransaksiDetail;
use App\Http\Requests\LaporanRequest;
use App\Models\Transaksi;
use App\Services\Master\AnggotaService;
use App\Services\Master\TabunganService;
use App\Services\Master\TokoService;
use App\Services\PengaturanService;
use App\Services\TransferService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransaksiController extends Controller
{
    public function __construct(
        protected TokoService $toko,
        protected TransferService $transfer,
        protected PengaturanService $pengaturan,
        protected TabunganService $tabungan,
        protected AnggotaService $anggota,
    ) {}
    public function index()
    {
        $toko = $this->toko->getTokosByUser(['id', 'nama', 'alamat', 'logo']);
        $pengaturanTunai = $this->pengaturan->getPengaturanByToko(['id'], TipePengaturan::TUNAI)->count();
        $hitungToko = $toko->count();
        if ($pengaturanTunai == $hitungToko) {
            $startDate = Carbon::now()->subDays(3)->format('d-m-Y');
            $endDate = Carbon::now()->format('d-m-Y');
            if (count($toko) > 1) {
                $kirim = [
                    'multi' => true,
                    'tokos' => $toko,
                    'tanggalTransaksi' => $startDate . ' - ' . $endDate,
                ];
            } else {
                $toko = $toko->first();
                $kirim = [
                    'multi' => false,
                    'tokos' => [
                        'id' => $toko->id,
                        'nama' => $toko->nama,
                        'alamat' => $toko->alamat,
                        'logo' => asset('storage/logos/' . $toko->logo),
                    ],
                    'tanggalTransaksi' => $startDate . ' - ' . $endDate,
                ];
            }
            return inertia('Transaksi/Menu', $kirim);
        } else {
            return inertia('Error', ['message' => 'Pengaturan Tunai belum lengkap, silahkan lengkapi pada menu pengaturan']);
        }
    }
    public function tabungan(Request $request)
    {
        $request->validate([
            'toko' => ['required', 'uuid'],
        ]);
        return response()->json($this->tabungan->getTabungansByToko(['merek'], ['id', 'merek_id', 'no', 'nominal'], ['toko_id' => $request->toko], false), 200);
    }
    public function data(Request $request)
    {
        $request->validate([
            'toko' => ['required', 'uuid'],
            'tanggal' => ['required', 'string'],
            'anggota' => ['nullable', 'uuid'],
            'nominal' => ['nullable', 'numeric'],
        ]);
        $tanggal = pecahTanggalRiwayat($request->tanggal, zonaWaktuPengguna());
        $where = $this->buildWhereClause($request, $tanggal);
        return $this->getTransaksiData($where);
    }

    public function transaksi(LaporanRequest $request)
    {
        $tanggal = pecahTanggalRiwayat($request->tanggal, zonaWaktuPengguna());
        $where = $this->buildWhereClause($request, $tanggal);
        return $this->getTransaksiData($where);
    }

    private function buildWhereClause($request, $tanggal)
    {
        $data = [
            'toko' => [$request->toko],
            'anggota' => $request->anggota,
            'nominal' => $request->nominal,
            'textTanggalAwal' => $tanggal['textTanggalAwal'],
            'textTanggalAkhir' => $tanggal['textTanggalAkhir'],
            'tanggalAwal' => $tanggal['awal'],
            'tanggalAkhir' => $tanggal['akhir'],
            'with' => ['user', 'toko', 'anggota'],
        ];
        if (auth()->user()->getRoleNames()[0] != 'pemilik') {
            $data['tipe'] = [
                TipeTransaksi::PENGHASILAN_LAIN,
                TipeTransaksi::TRANSFER_VIA_ATM_NASABAH,
                TipeTransaksi::TRANSFER_TUNIA,
                TipeTransaksi::TARIK_TUNAI,
                TipeTransaksi::TARIK_TUNAI_EDC,
                TipeTransaksi::TABUNGAN,
                TipeTransaksi::INVESTASI,
                TipeTransaksi::TARIK_TUNAI_EDC,
                TipeTransaksi::PENJUALAN_PULSA,
                TipeTransaksi::PENJUALAN_PAKET_DATA,
                TipeTransaksi::PENGAMBILAN_POIN
            ];
        }
        return $data;
    }
    private function getAksi($keterangan)
    {
        $disabledTransactions = [
            TipeTransaksi::PRODUKTIF->value,
            TipeTransaksi::KONSUMTIF->value,
            TipeTransaksi::MUTASI_SALDO->value,
            TipeTransaksi::MEMINJAMKAN->value,
            TipeTransaksi::PINJAM->value,
            TipeTransaksi::PENGHASILAN_LAIN->value,
            TipeTransaksi::PENGAMBILAN_POIN->value,
            TipeTransaksi::TRANSFER_VIA_ATM_NASABAH->value,
        ];

        return !in_array($keterangan, $disabledTransactions);
    }

    private function getTransaksiData($where)
    {
        $zonaWaktuPengguna = zonaWaktuPengguna();
        $transaksis = $this->transfer->get($where);

        $total = 0;
        $datas = [];

        foreach ($transaksis as $key => $transaksi) {
            $subTotal = 0;
            if ($transaksi->tipe == TipeTransaksi::TABUNGAN->value) {
                foreach ($transaksi->transaksiDetail as $transaksiDetail) {
                    if ($transaksiDetail->tipe == TipeTransaksiDetail::MENAMBAH->value) {
                        $subTotal += $transaksiDetail->nominal;
                    } else {
                        if ($transaksiDetail->keterangan == KeteranganTransferDetail::NOMINAL_PENARIKAN->value) {
                            $subTotal += $transaksiDetail->nominal;
                        }
                    }
                }
            } else if ($transaksi->tipe == TipeTransaksi::TARIK_TUNAI->value || $transaksi->tipe == TipeTransaksi::TARIK_TUNAI_EDC->value) {
                foreach ($transaksi->transaksiDetail as $transaksiDetail) {
                    if ($transaksiDetail->tipe == TipeTransaksiDetail::MENAMBAH->value) {
                        if ($transaksiDetail->keterangan != KeteranganTransferDetail::NOMINAL_TRANSFER->value) {
                            $subTotal -= $transaksiDetail->nominal;
                        } else {
                            $subTotal = $transaksiDetail->nominal;
                        }
                    }
                }
            } else {
                $subTotal = $transaksi->total;
            }

            $total += $subTotal;
            $datas[] = [
                'no' => ++$key,
                'id' => $transaksi->id,
                'tanggal' => formatTanggal($transaksi->tanggal, $zonaWaktuPengguna),
                'pengguna' => $transaksi->user?->name,
                'anggota' => $transaksi->anggota?->nama,
                'total' => rupiah($subTotal),
                'tipe' => $transaksi->tipe,
                'keterangan' => $transaksi->keterangan,
                'aksi' => $this->getAksi($transaksi->tipe),
            ];
        }

        $response = [
            'data' => $datas,
            'tanggalAwal' => $where['textTanggalAwal'],
            'tanggalAkhir' => $where['textTanggalAkhir'],
            'total' => rupiah($total),
        ];

        return response()->json($response, 200);
    }

    public function transaksiDetail(LaporanRequest $request)
    {
        $zonaWaktuPengguna = zonaWaktuPengguna();
        $tanggal = pecahTanggalRiwayat($request->tanggal, $zonaWaktuPengguna);
        $transaksi = $this->transfer->get(
            [
                'toko' => [$request->toko],
                'textTanggalAwal' => $tanggal['textTanggalAwal'],
                'textTanggalAkhir' => $tanggal['textTanggalAkhir'],
                'tanggalAwal' => $tanggal['awal'],
                'tanggalAkhir' => $tanggal['akhir'],
                'tipe' => [
                    TipeTransaksi::PENGHASILAN_LAIN,
                    TipeTransaksi::TRANSFER_VIA_ATM_NASABAH,
                    TipeTransaksi::TRANSFER_TUNIA,
                    TipeTransaksi::TARIK_TUNAI,
                    TipeTransaksi::TARIK_TUNAI_EDC,
                    TipeTransaksi::TABUNGAN,
                    TipeTransaksi::INVESTASI,
                    TipeTransaksi::TARIK_TUNAI_EDC,
                    TipeTransaksi::PENJUALAN_PULSA,
                    TipeTransaksi::PENJUALAN_PAKET_DATA,
                    TipeTransaksi::PENGAMBILAN_POIN
                ],
                'with' => ['user', 'toko', 'anggota', 'transaksiDetail'],
            ]
        );
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
                'tipe' => $value->tipe,
                'keterangan' => $value->keterangan,
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
    public function get(Request $request)
    {
        $request->validate([
            'id' => ['required', 'uuid'],
        ]);
        $zonaWaktuPengguna = zonaWaktuPengguna();
        $transaksi = $this->transfer->getOnlyOne($request->id);
        $result = [];
        $total = 0;
        if ($transaksi->tipe == TipeTransaksi::TABUNGAN->value) {
            foreach ($transaksi->transaksiDetail as $value) {
                if ($value->tipe == TipeTransaksiDetail::MENAMBAH->value) {
                    $total += $value->nominal;
                    $result[] = [
                        'keterangan' => $value->keterangan,
                        'nominal' => rupiah($value->nominal)
                    ];
                } else {
                    if ($value->keterangan == KeteranganTransferDetail::NOMINAL_PENARIKAN->value) {
                        $total += $value->nominal;
                        $result[] = [
                            'keterangan' => $value->keterangan,
                            'nominal' => rupiah($value->nominal)
                        ];
                    }
                }
            }
        } else if ($transaksi->tipe == TipeTransaksi::PENJUALAN_PULSA->value || $transaksi->tipe == TipeTransaksi::PENJUALAN_PAKET_DATA->value) {
            $total = $transaksi->total;
            $result[] = [
                'keterangan' => $transaksi->tipe,
                'nominal' => rupiah($total)
            ];
        } else if ($transaksi->tipe == TipeTransaksi::TARIK_TUNAI->value || $transaksi->tipe == TipeTransaksi::TARIK_TUNAI_EDC->value) {
            foreach ($transaksi->transaksiDetail as $value) {
                if ($value->tipe == TipeTransaksiDetail::MENAMBAH->value) {
                    if ($value->keterangan != KeteranganTransferDetail::NOMINAL_TRANSFER->value) {
                        $total -= $value->nominal;
                    } else {
                        $total = $value->nominal;
                    }
                    $result[] = [
                        'keterangan' => $value->keterangan,
                        'nominal' => rupiah($value->nominal)
                    ];
                }
            }
        } else {
            foreach ($transaksi->transaksiDetail as $value) {
                if ($value->tipe == TipeTransaksiDetail::MENAMBAH->value) {
                    $total += $value->nominal;
                    $result[] = [
                        'keterangan' => $value->keterangan,
                        'nominal' => rupiah($value->nominal)
                    ];
                }
            }
        }
        return response()->json(['tanggal' => formatTanggal($transaksi->tanggal, $zonaWaktuPengguna),
            'kasir' => $transaksi?->user?->name,
            'anggota' => $transaksi?->anggota?->nama,
            'alamat' => $transaksi?->anggota?->alamat,
            'tipe' => $transaksi?->tipe,
            'keterangan' => $transaksi?->keterangan,
            'total' => rupiah($total),
            'cetak' => formatTanggal(time(), $zonaWaktuPengguna),
            'detail' => $result,
        ], 200);
    }
    public function hapus(Transaksi $transaksi)
    {
        try {
            DB::beginTransaction();
            $biayaAdmin = 0;
            foreach ($transaksi->transaksiDetail  as $value) {
                $this->tabungan->updateNominal([
                    'tipe' => $value->tipe == TipeTransaksiDetail::MENGURANGI->value ? 'menambahkan' : 'mengurangi',
                    'tabungan' => $value->tabungan_id,
                    'nominal' => $value->nominal,
                ]);
                if ($value->keterangan == KeteranganTransferDetail::BIAYA_ADMIN->value) {
                    $biayaAdmin = $value->nominal;
                }
                $value->delete();
            }
            if ($transaksi->anggota_id) {
                $this->anggota->updatePoin([
                    'anggota' => $transaksi->anggota_id,
                    'aksi' => 'mengurangi',
                    'nominal' => persenNominal($biayaAdmin, 10),
                ]);
            }
            $transaksi->delete();
            DB::commit();
            return response()->json(['message' => 'Transaksi berhasil dihapus'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => $e], 422);
        }
    }
}
