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
        Schema::table('contents', function (Blueprint $table) {
            // 外部キー削除（まず削除しないとカラム名変更できない）
            $table->dropForeign(['entrysheet_id']);

            // カラム名変更
            $table->renameColumn('entrysheet_id', 'entry_sheet_id');
        });

        // 外部キーを再追加（別ブロックで）
        Schema::table('contents', function (Blueprint $table) {
            $table->foreign('entry_sheet_id')
                ->references('id')
                ->on('entry_sheets')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('contents', function (Blueprint $table) {
            $table->dropForeign(['entry_sheet_id']);
            $table->renameColumn('entry_sheet_id', 'entrysheet_id');
        });

        Schema::table('contents', function (Blueprint $table) {
            $table->foreign('entrysheet_id')
                ->references('id')
                ->on('entrysheets')
                ->onDelete('cascade');
        });
    }
};
