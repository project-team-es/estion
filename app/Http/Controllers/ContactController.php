<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMail;

class ContactController extends Controller
{
    /**
     * お問い合わせフォームを表示
     */
    public function create()
    {
        return view('contact.create'); 
    }

     /**
     * お問い合わせ内容を処理
     */
    public function send(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string|max:1000',
        ]);

        Mail::to(config('mail.admin_email'))->send(new ContactMail($validated));
        return redirect()->route('contact.create')->with('success', 'お問い合わせを送信しました！');
    }
}
