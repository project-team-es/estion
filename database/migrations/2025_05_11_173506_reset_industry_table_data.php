<?php

use App\Models\Industry;
use Illuminate\Database\Migrations\Migration;
// モデルをインポート
use Illuminate\Support\Facades\Schema;

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
