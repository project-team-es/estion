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
        Schema::table('entry_sheets', function (Blueprint $table) {
            $table->dropForeign(['company_id']); // 既存の外部キーを削除
            $table->foreign('company_id')
                  ->references('id')
                  ->on('companies')
                  ->onDelete('cascade'); // cascade削除を追加
        });

        Schema::table('contents', function (Blueprint $table) {
            $table->dropForeign(['entry_sheet_id']); // 既存の外部キーを削除
            $table->foreign('entry_sheet_id')
                  ->references('id')->on('entry_sheets')
                  ->onDelete('cascade'); // cascade削除を追加
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('entry_sheets', function (Blueprint $table) {
            $table->dropForeign(['company_id']);
            $table->foreign('company_id')
                  ->references('id')->on('companies')
                  ->onDelete('restrict'); // 元に戻す場合は restrict にする
        });

        Schema::table('contents', function (Blueprint $table) {
            $table->dropForeign(['entry_sheet_id']);
            $table->foreign('entry_sheet_id')
                  ->references('id')->on('entry_sheets')
                  ->onDelete('restrict'); // 元に戻す場合は restrict にする
        });
    }
};
