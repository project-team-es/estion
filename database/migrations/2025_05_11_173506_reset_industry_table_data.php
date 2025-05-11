<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// モデルをインポート
use App\Models\Industry;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 外部キーを無効にしてテーブルをリセット
        Schema::disableForeignKeyConstraints();
        Industry::truncate();
        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
