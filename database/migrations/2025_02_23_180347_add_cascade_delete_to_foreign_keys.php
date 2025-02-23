<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('entrysheets', function (Blueprint $table) {
            $table->dropForeign(['company_id']); // 既存の外部キーを削除
            $table->foreign('company_id')
                  ->references('id')->on('companies')
                  ->onDelete('cascade'); // cascade削除を追加
        });

        Schema::table('contents', function (Blueprint $table) {
            $table->dropForeign(['entrysheet_id']); // 既存の外部キーを削除
            $table->foreign('entrysheet_id')
                  ->references('id')->on('entrysheets')
                  ->onDelete('cascade'); // cascade削除を追加
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('entrysheets', function (Blueprint $table) {
            $table->dropForeign(['company_id']);
            $table->foreign('company_id')
                  ->references('id')->on('companies')
                  ->onDelete('restrict'); // 元に戻す場合は restrict にする
        });

        Schema::table('contents', function (Blueprint $table) {
            $table->dropForeign(['entrysheet_id']);
            $table->foreign('entrysheet_id')
                  ->references('id')->on('entrysheets')
                  ->onDelete('restrict'); // 元に戻す場合は restrict にする
        });
    }
};
