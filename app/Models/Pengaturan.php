<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengaturan extends Model
{
    use HasFactory, HasUuids;
    protected $guarded = ['id'];
    public $timestamps = false;
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function toko()
    {
        return $this->belongsTo(Toko::class);
    }
    public function tabungan()
    {
        return $this->belongsTo(Tabungan::class)->with('merek');
    }
}