<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tabungan extends Model
{
    use HasFactory, SoftDeletes;
    protected $guarded = ['id'];
    public function toko()
    {
        return $this->belongsTo(Toko::class);
    }
    public function merek()
    {
        return $this->belongsTo(Merek::class);
    }
}
