<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactMail extends Mailable
{
    use Queueable, SerializesModels;

    public $data; // メールデータを保持するプロパティ

    /**
     * Create a new message instance.
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->from(config('mail.from.address')) // 送信元アドレスを設定
                    ->subject('お問い合わせが届きました') // メールの件名
                    ->view('emails.contact') // 送信するビューを指定
                    ->with('data', $this->data); // ビューにデータを渡す
    }
}
