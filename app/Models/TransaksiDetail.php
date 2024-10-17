<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransaksiDetail extends Model
{
    use HasFactory, HasUuids;
    protected $guarded = ['id'];

    public function transaksi()
    {
        return $this->belongsTo(Transaksi::class)->with('user');
    }
    public function tabungan()
    {
        return $this->belongsTo(Tabungan::class)->with('merek');
    }
}
