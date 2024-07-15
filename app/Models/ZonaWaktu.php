<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Scout\Searchable;

class ZonaWaktu extends Model
{
    use HasFactory, Searchable, SoftDeletes;
    protected $guarded = ['id'];
    public function toSearchableArray(): array
    {
        return [
            'nama' => $this->nama,
            'singkatan' => $this->singkatan,
        ];
    }
}
