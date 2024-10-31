<?php

function rupiah($d)
{
     return number_format($d, 0, ',', ',');
}
function zonaWaktuPengguna()
{
     return auth()->user()->zonaWaktu;
}
function formatTanggal($tanggal, $zonaWaktuPengguna, $bold = false)
{
     if ($bold) {
          return date('d-m-Y H:i:s', ($tanggal + $zonaWaktuPengguna->gmt_offset)) . ' <b>' . $zonaWaktuPengguna->singkatan . '</b>';
     } else {
          return date('d-m-Y H:i:s', ($tanggal + $zonaWaktuPengguna->gmt_offset)) . ' ' . $zonaWaktuPengguna->singkatan;
     }
}
function pecahTanggalRiwayat($tanggal, $zonaWaktuPengguna)
{
     $tanggalExplode = explode(" - ", $tanggal);
     $textTanggalAwal = $tanggalExplode[0];
     $textTanggalAkhir = $tanggalExplode[1];
     return [
          'textTanggalAwal' => $textTanggalAwal,
          'textTanggalAkhir' => $textTanggalAkhir,
          'awal' => strtotime($textTanggalAwal . ' 00:00:00') - $zonaWaktuPengguna->gmt_offset,
          'akhir' => strtotime($textTanggalAkhir . ' 23:59:59') - $zonaWaktuPengguna->gmt_offset,
     ];
}
function hariIniDanLalu($jumlahHari, $zonaWaktuPengguna)
{
     $tanggalLalu = date('Y-m-d', strtotime($jumlahHari . ' days'));
     $TanggalIni = date('Y-m-d');
     return [
          'textTanggalAwal' => ubahFormatTanggal($tanggalLalu),
          'textTanggalAkhir' => ubahFormatTanggal($TanggalIni),
          'awal' => strtotime($tanggalLalu . ' 00:00:00') - $zonaWaktuPengguna->gmt_offset,
          'akhir' => strtotime($TanggalIni . ' 23:59:59') - $zonaWaktuPengguna->gmt_offset,
     ];
}
function ubahFormatTanggal($t)
{
     $tanggal = explode("-", $t);
     return $tanggal[2] . '-' . $tanggal[1] . '-' . $tanggal[0];
}

function fileName()
{
     $s = strtoupper(md5(uniqid(rand(), true)));
     $kode =
          substr($s, 0, 8) . '-' .
          substr($s, 8, 4) . '-' .
          substr($s, 12, 4) . '-' .
          substr($s, 16, 4) . '-' .
          substr($s, 20) . '-' .
          time();
     return $kode;
}

function persenNominal($nominal, $persen = 100)
{
     return ($nominal * $persen) / 100;
}
