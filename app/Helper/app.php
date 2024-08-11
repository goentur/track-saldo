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
