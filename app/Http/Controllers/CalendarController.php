<?php

namespace App\Http\Controllers;

use Google_Client;
use Google_Service_Calendar;

class CalendarController extends Controller
{
    /**
     * ユーザーの Google カレンダーの予定を取得する
     */
    public function getUserEvents()
    {
        // セッションから Google カレンダーのアクセストークンを取得
        $accessToken = session('google_access_token');

        if (! $accessToken) {
            return response()->json(['error' => 'Google カレンダーにアクセスするにはログインが必要です'], 401);
        }

        // Google クライアントを設定
        $client = new Google_Client;
        $client->setClientId(env('GOOGLE_CLIENT_ID'));
        $client->setClientSecret(env('GOOGLE_CLIENT_SECRET'));
        $client->setAccessToken($accessToken);

        // トークンが期限切れならエラーを返す
        if ($client->isAccessTokenExpired()) {
            return response()->json(['error' => 'Google カレンダーのセッションが切れました。再ログインしてください'], 401);
        }

        // Google カレンダー API サービスを作成
        $service = new Google_Service_Calendar($client);
        $calendarId = 'primary'; // メインのカレンダー
        $events = $service->events->listEvents($calendarId);

        // 予定を JSON で返す
        return response()->json($events->getItems());
    }
}
