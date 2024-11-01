<?php

namespace App\Enums;

enum TipeTransaksi: string
{
    case MUTASI_SALDO = 'MUTASI SALDO';
    case MEMINJAMKAN = 'MEMINJAMKAN';
    case PINJAM = 'PINJAM';
    case PRODUKTIF = 'PRODUKTIF';
    case KONSUMTIF = 'KONSUMTIF';
    case PENGHASILAN_LAIN = 'PENGHASILAN LAIN';
    case TRANSFER_VIA_ATM_NASABAH = 'TRANSFER VIA ATM NASABAH';
    case TOP_UP = 'TOP UP';
    case TRANSFER_TUNIA = 'TRANSFER TUNAI';
    case TARIK_TUNAI = 'TARIK TUNAI';
    case TARIK_TUNAI_EDC = 'TARIK TUNAI EDC';
    case TABUNGAN = 'TABUNGAN';
    case INVESTASI = 'INVESTASI';
    case PENJUALAN_PULSA = 'PENJUALAN PULSA';
    case PENJUALAN_PAKET_DATA = 'PENJUALAN PAKET DATA';
    case PENGAMBILAN_POIN = 'PENGAMBILAN POIN';
}
