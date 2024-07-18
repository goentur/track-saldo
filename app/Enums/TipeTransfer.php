<?php

namespace App\Enums;

enum TipeTransfer: string
{
    case TRANSFER_VIA_ATM_NASABAH = 'TRANSFER VIA ATM NASABAH';
    case TRANSFER_TUNIA = 'TRANSFER TUNAI';
    case TAMBAH_SALDO = 'TAMBAH SALDO';
    case TARIK_TUNAI = 'TARIK TUNAI';
}
