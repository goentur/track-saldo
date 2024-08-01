<?php

function rupiah($d)
{
     return number_format($d, 0, ',', ',');
}
function zonaWaktuPengguna()
{
     return auth()->user()->zonaWaktu;
}
function tanggalSekarang($zonaWaktuPengguna, $minsOneWeek = false, $hours = false)
{
     $timePengguna = time() + $zonaWaktuPengguna->gmt_offset;
     if ($minsOneWeek) {
          $timePengguna = $timePengguna - 604800;
     }
     if ($hours) {
          return date('d-m-Y H:i:s', $timePengguna);
     } else {
          return date('d-m-Y', $timePengguna);
     }
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
     if (!empty($tanggalExplode[0]) && !empty($tanggalExplode[1])) {
          $txtTanggalAwal = $tanggalExplode[0];
          $txtTanggalAkhir = $tanggalExplode[1];
     } else {
          $txtTanggalAwal = $tanggal;
          $txtTanggalAkhir = $tanggal;
     }
     return [
          'txtAwal' => $txtTanggalAwal,
          'txtAkhir' => $txtTanggalAkhir,
          'awal' => strtotime($txtTanggalAwal . ' 00:00:00') - $zonaWaktuPengguna->gmt_offset,
          'akhir' => strtotime($txtTanggalAkhir . ' 23:59:59') - $zonaWaktuPengguna->gmt_offset,
     ];
}
