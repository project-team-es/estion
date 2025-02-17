<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Industry;

class IndustrySeeder extends Seeder
{
    public function run()
    {
        $industries = [
            'IT',
            'Web系',
            'SIer',
            '製造業', 
            '金融', 
            '建設・不動産', 
            '小売・流通', 
            '医療・福祉',
            '教育', 'エネルギー', 
            '飲食・サービス', 
            '広告・マスコミ', 
            '官公庁・公社・団体',
            'コンサル',
        ];

        foreach ($industries as $industry) {
            Industry::firstOrCreate(['name' => $industry]); // 重複を防ぐ
        }
    }
}
