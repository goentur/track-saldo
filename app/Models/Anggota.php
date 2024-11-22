<?php

namespace App\Models;

use App\Enums\TipeSimpananAnggota;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Anggota extends Model
{
    use HasFactory, SoftDeletes, HasUuids;
    protected $guarded = ['id'];
    public function toko()
    {
        return $this->belongsTo(Toko::class);
    }
    public function simpanan()
    {
        return $this->hasMany(SimpananAnggota::class);
    }
    public function tabungan()
    {
        return $this->hasOne(SimpananAnggota::class)->where('tipe', TipeSimpananAnggota::TABUNGAN);
    }
}
