<?php

namespace App\Enums;

enum KeteranganTransferDetail: string
{
    case NOMINAL_TRANSFER = 'NOMINAL TRANSFER';
    case NOMINAL_PENGELUARAN = 'NOMINAL PENGELUARAN';
    case BIAYA_ADMIN = 'BIAYA ADMIN';
    case BIAYA_TRANSFER = 'BIAYA TRANSFER';
}
