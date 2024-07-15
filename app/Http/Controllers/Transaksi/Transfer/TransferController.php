<?php

namespace App\Http\Controllers\Transaksi\Transfer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TransferController extends Controller
{
    public function index()
    {
        return inertia('Transaksi/Transfer/Menu');
    }
}
