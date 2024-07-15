<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Scout\Searchable;

class Toko extends Model
{
    use HasFactory, Searchable, SoftDeletes;
    protected $guarded = ['id'];
    public function toSearchableArray(): array
    {
        return [
            'nama' => $this->nama,
        ];
    }
    public function merek()
    {
        return $this->hasMany(Merek::class);
    }
}
