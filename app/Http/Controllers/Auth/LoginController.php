<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Str;

class LoginController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        $googleUser = Socialite::driver('google')->stateless()->user();
        $existingUser = User::where('email', $googleUser->email)->first();

        if($existingUser){
            // 既に登録済みの場合,nameを更新しない
            $existingUser->update([
                'google_id' => $googleUser->id,
            ]);
            // ユーザーをログインさせる
            Auth::login($existingUser, true);
        } else {
            $user = User::updateOrCreate([
                'email' => $googleUser->getEmail(),
            ], [
                'name' => $googleUser->getName(),
                'email' => $googleUser->getEmail(),
                // 必要に応じて他のフィールドを設定
                'password' => bcrypt(Str::random()), // ランダムなパスワードを生成（使用しないので任意でOK）
            ]);
            // ユーザーをログインさせる
            Auth::login($user, true);
        }
        

        // ホームページへリダイレクト
        return redirect()->route('dashboard');
    }
}