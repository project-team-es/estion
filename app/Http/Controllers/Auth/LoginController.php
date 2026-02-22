<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Google_Client;
use Google_Service_Calendar;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class LoginController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')
            ->scopes([
                // 'https://www.googleapis.com/auth/calendar',
                // 'https://www.googleapis.com/auth/calendar.events',
            ])
            ->with(['access_type' => 'offline', 'prompt' => 'consent'])
            ->redirect();
    }

    public function handleGoogleCallback()
    {
        $googleUser = Socialite::driver('google')->stateless()->user();

        // 取得した Google ユーザー情報を確認
        // dd($googleUser);

        // `id` は `sub` から取得する
        $googleId = $googleUser->user['sub'];
        $googleAccessToken = $googleUser->token;
        $googleRefreshToken = $googleUser->refreshToken ?? null;

        \Log::info('Google OAuth: 取得したアクセストークン - '.$googleAccessToken);
        \Log::info('Google OAuth: 取得したリフレッシュトークン - '.($googleRefreshToken ?? 'なし'));
        // 既存のユーザーを取得
        $existingUser = User::where('email', $googleUser->email)->first();

        if ($existingUser) {
            // 既存ユーザーの情報を更新
            $updateResult = $existingUser->update([
                'google_id' => $googleId,
                'google_access_token' => $googleAccessToken,
                'google_refresh_token' => $googleRefreshToken ?? $existingUser->google_refresh_token, // リフレッシュトークンを保存
            ]);

            \Log::info('Google OAuth: ユーザー更新結果 - '.($updateResult ? '成功' : '失敗'));
            \Log::info('Google OAuth: 保存後のデータ - '.json_encode($existingUser->toArray())); // 確認用

            Auth::login($existingUser, true);
        } else {
            // 新規ユーザーを作成
            $user = User::updateOrCreate([
                'name' => $googleUser->name,
                'email' => $googleUser->email,
                'google_id' => $googleId,
                'google_access_token' => $googleAccessToken,
                'google_refresh_token' => $googleRefreshToken, // 新規登録時も保存
                'password' => bcrypt(uniqid()),
            ]);

            \Log::info('Google OAuth: 新規ユーザー作成 - '.json_encode($user->toArray()));

            // ユーザーをログインさせる
            Auth::login($user, true);
        }

        // Google カレンダー API の認証情報を取得

        $client = new Google_Client;
        $client->setClientId(env('GOOGLE_CLIENT_ID'));
        $client->setClientSecret(env('GOOGLE_CLIENT_SECRET'));
        $client->setRedirectUri(env('GOOGLE_REDIRECT_URI'));
        // $client->addScope(Google_Service_Calendar::CALENDAR_READONLY);
        $client->setAccessToken($googleUser->token);

        // アクセストークンをセッションに保存
        session(['google_access_token' => $googleUser->token]);

        // ホームページへリダイレクト
        return redirect()->route('dashboard');
    }
}
