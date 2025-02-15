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
        Schema::create('entrysheet_tag', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('entrysheet_id');
            $table->unsignedBigInteger('tag_id');
            $table->timestamps();

            // 外部キー制約
            $table->foreign('entrysheet_id')->references('id')->on('entrysheets')->onDelete('cascade');
            $table->foreign('tag_id')->references('id')->on('tags')->onDelete('cascade');

            // 同じエントリーシートに同じタグを重複して登録できないようにする
            $table->unique(['entrysheet_id', 'tag_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entrysheet_tag');
    }
};
