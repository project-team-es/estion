<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;
use App\Models\EntrySheet;
use App\Mail\EntrySheetReminderMail;

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
