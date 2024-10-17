<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('simpanan_anggotas', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('anggota_id')->nullable()->comment('id anggota');
            $table->bigInteger('nominal')->nullable();
            $table->bigInteger('tanggal_pengambilan')->nullable();
            $table->string('tipe')->nullable();
            $table->string('status')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('simpanan_anggotas');
    }
};
