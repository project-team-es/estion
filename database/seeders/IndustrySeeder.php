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
            'IT・通信',
            'コンサル・シンクタンク',
            'メーカー', 
            'インフラ・交通',
            'エネルギー',
            '商社',
            '金融', 
            '建設・不動産', 
            '広告・マスコミ',
            '医療・福祉',
            '人材・教育',
            '小売・流通',
            '旅行・観光',
            '官公庁・公社・団体',
            'その他'
        ];

        foreach ($industries as $industry) {
            Industry::firstOrCreate(['name' => $industry]); // 重複を防ぐ
        }
    }
}
