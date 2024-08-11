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
        Schema::create('transaksis', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('user_id')->nullable()->comment('id user');
            $table->string('toko_id')->nullable()->comment('id toko');
            $table->string('anggota_id')->nullable()->comment('id anggota');
            $table->bigInteger('tanggal')->nullable();
            $table->bigInteger('total')->nullable();
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
        Schema::dropIfExists('transaksis');
    }
};
