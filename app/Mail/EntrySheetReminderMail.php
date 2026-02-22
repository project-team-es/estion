<?php

namespace App\Mail;

use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class EntrySheetReminderMail extends Mailable
{
    use Queueable, SerializesModels;

    public $entrysheet;

    /**
     * Create a new message instance.
     */
    public function __construct($entrysheet)
    {
        $this->entrysheet = $entrysheet;
        $this->entrysheet->deadline = Carbon::parse($entrysheet->deadline);
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->from(config('mail.from.address'), config('mail.from.name'))
            ->subject('【リマインド】エントリーシートの締切が近づいています')
            ->view('emails.entrysheet_reminder')
            ->with([
                'entrysheet' => $this->entrysheet,
            ]);
    }
}
