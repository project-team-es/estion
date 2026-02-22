<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * アプリケーションのArtisanコマンドを登録
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }

    /**
     * アプリケーションのスケジュールタスクを定義
     */
    protected function schedule(Schedule $schedule)
    {
        // 毎日午前9時にエントリーシートのリマインドメールを送信
        $schedule->command('reminder:entrysheet')->dailyAt('09:00');
    }
}
