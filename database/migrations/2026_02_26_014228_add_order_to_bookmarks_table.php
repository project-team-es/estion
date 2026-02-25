<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('bookmarks', function (Blueprint $table) {
            $table->integer('order')->default(0)->after('url');
        });

        // 既存レコードに初期順序を設定（ユーザーごと・作成日時順）
        $users = DB::table('users')->pluck('id');
        foreach ($users as $userId) {
            $ids = DB::table('bookmarks')
                ->where('user_id', $userId)
                ->whereNull('deleted_at')
                ->orderBy('created_at')
                ->pluck('id');
            foreach ($ids as $index => $id) {
                DB::table('bookmarks')->where('id', $id)->update(['order' => $index]);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bookmarks', function (Blueprint $table) {
            $table->dropColumn('order');
        });
    }
};
