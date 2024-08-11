<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    use HasFactory, HasUuids;
    protected $guarded = ['id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function toko()
    {
        return $this->belongsTo(Toko::class);
    }
    public function anggota()
    {
        return $this->belongsTo(Anggota::class);
    }
    public function transaksiDetail()
    {
        return $this->hasMany(TransaksiDetail::class)->with('tabungan');
    }
}
