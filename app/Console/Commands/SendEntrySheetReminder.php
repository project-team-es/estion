<?php

namespace App\Console\Commands;

use App\Mail\EntrySheetReminderMail;
use App\Models\EntrySheet;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendEntrySheetReminder extends Command
{
    protected $signature = 'reminder:entrysheet';

    protected $description = 'エントリーシートの締切3日前にリマインドメールを送信する';

    public function handle()
    {
        $threeDaysLater = Carbon::now()->addDays(3)->startOfDay();

        $entrysheets = EntrySheet::whereDate('deadline', $threeDaysLater)->get();

        foreach ($entrysheets as $entrysheet) {
            Mail::to($entrysheet->user->email)->send(new EntrySheetReminderMail($entrysheet));
        }

        $this->info('リマインドメールを送信しました');
    }
}
