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
        Schema::create('pengaturans', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('user_id')->nullable()->comment('id user');
            $table->string('toko_id')->nullable()->comment('id toko');
            $table->string('tabungan_id')->nullable()->comment('id tabungan');
            $table->string('tipe')->nullable();
            $table->bigInteger('tanggal')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengaturans');
    }
};
