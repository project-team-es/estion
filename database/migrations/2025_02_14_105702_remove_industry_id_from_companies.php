<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->dropForeign(['industry_id']); // 外部キー制約を削除
            $table->dropColumn('industry_id'); // `industry_id` カラムを削除
        });
    }

    public function down(): void
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->unsignedBigInteger('industry_id')->nullable();
            $table->foreign('industry_id')->references('id')->on('industries')->onDelete('cascade');
        });
    }
};
