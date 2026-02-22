<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEntrysheetRequest;
use App\Http\Requests\UpdateEntrysheetRequest;
use App\Models\Company;
use App\Models\Content;
use App\Models\EntrySheet;
use App\Models\Industry;
use Google_Client;
use Google_Service_Calendar;
use Google_Service_Calendar_Event;
use Google_Service_Calendar_EventDateTime;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\View as ViewClass;
use Inertia\Inertia;
use Inertia\Response;
use Mpdf\Mpdf;

class EntrysheetController extends Controller implements HasMiddleware
{
    public function index(Request $request): Response
    {
        $entrysheets = EntrySheet::where('user_id', Auth::id())->with('company')->get();

        return Inertia::render('App/Entrysheet/Index/index', [
            'entrysheets' => $entrysheets,
        ]);
    }

    public static function middleware(): array
    {
        return [
            'auth',
            'verified',
        ];
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $companies = Company::where('user_id', Auth::id())->get();
        $industries = Industry::with(['companies' => function ($query) {
            $query->where('user_id', Auth::id());
        }])->get();

        $presetTitles = [
            'インターン',
            '夏インターン',
            '秋・冬インターン',
            '長期インターン',
            '本選考',
            '説明会',
            'アンケート',
            'OB・OG訪問',
            'その他の就活イベント',
        ];

        return Inertia::render('App/Entrysheet/Create/index', [
            'industries' => $industries,
            'companies' => $companies,
            'presetTitles' => $presetTitles,
        ]);
    }

    public function createWithCompany($company_id): Response
    {
        $presetTitles = [
            'インターン', '夏インターン', '秋・冬インターン', '長期インターン',
            '本選考', '説明会', 'アンケート', 'OB・OG訪問', 'その他の就活イベント',
        ];

        $company = Company::find($company_id);
        if (! $company) {
            abort(404, '企業が見つかりません');
        }

        return Inertia::render('App/Entrysheet/Create/CreateWithCompany', [
            'company' => $company,
            'presetTitles' => $presetTitles,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEntrysheetRequest $request)
    {
        $entrysheet = EntrySheet::create([
            'title' => $request->title,
            'deadline' => $request->deadline,
            'company_id' => $request->company_id,
            'user_id' => Auth::id(),
        ]);

        // 質問を保存
        foreach ($request->questions as $question) {
            Content::create([
                'entry_sheet_id' => $entrysheet->id,
                'question' => $question,
            ]);
        }

        // Google カレンダーへ登録
        // if ($request->deadline) {
        //     $this->addToGoogleCalendar($entrysheet);
        // }
        return redirect()->route('entrysheet.show', ['entrysheet' => $entrysheet->id])
            ->with('success', 'エントリーシートが登録されました！');
    }

    /**
     * Display the specified resource.
     */
    public function show(EntrySheet $entrysheet): Response
    {
        $entrysheet->load(['company', 'contents']); // company も必要

        return Inertia::render('App/Entrysheet/Show/index', [
            'entrysheet' => $entrysheet,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(EntrySheet $entrysheet)
    {
        $companies = Company::where('user_id', Auth::id())->get();
        $presetTitles = [
            'インターン',
            '夏インターン',
            '秋・冬インターン',
            '長期インターン',
            '本選考',
            '説明会',
            'アンケート',
            'OB・OG訪問',
            'その他の就活イベント',
        ];

        return Inertia::render('App/Entrysheet/Edit/index', [
            'entrysheet' => $entrysheet,
            'companies' => $companies,
            'presetTitles' => $presetTitles,

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEntrysheetRequest $request, EntrySheet $entrysheet)
    {
        $entrysheet->update([
            'title' => $request->title,
            'status' => $request->status,
            'deadline' => $request->deadline,
            'company_id' => $request->company_id,
        ]);

        return redirect()->route('entrysheet.show', $entrysheet->id)
            ->with('success', 'エントリーシートを更新しました！');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EntrySheet $entrysheet)
    {
        // ユーザー権限の確認
        if ($entrysheet->user_id !== Auth::id()) {
            return response()->json(['error' => '削除権限がありません'], 403);
        }

        try {
            $entrysheet->delete(); // ソフトデリート（物理削除したい場合は `forceDelete()`）

            return redirect()->route('entrysheet')->with('success', 'エントリーシートを削除しました。');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'エントリーシートの削除に失敗しました。']);
        }
    }

    public function generatePDF($id)
    {
        $entrysheet = EntrySheet::with('contents')->findOrFail($id);
        $pdfView = ViewClass::make('entrysheet.pdf', compact('entrysheet'))->render();

        $mpdf = new Mpdf([
            'mode' => 'ja',
            'format' => 'A4',
            'default_font' => 'ipaexg', // 日本語フォント指定
        ]);

        $mpdf->WriteHTML($pdfView);

        return response($mpdf->Output("EntrySheet_{$entrysheet->id}.pdf", 'I'))->header('Content-Type', 'application/pdf');
    }

    /**
     * serch entrysheet
     */
    public function search(Request $request)
    {
        $query = EntrySheet::where('user_id', Auth::id());

        // 企業名で検索
        if ($request->filled('search')) {
            $query->whereHas('company', function ($query) use ($request) {
                $query->where('name', 'like', '%'.$request->search.'%');
            });
        }

        // ステータスでフィルタリング
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // 並び替え
        if ($request->filled('order_by')) {
            switch ($request->order_by) {
                case 'created_at_asc':
                    $query->orderBy('created_at', 'asc');
                    break;
                case 'created_at_desc':
                    $query->orderBy('created_at', 'desc');
                    break;
                case 'deadline_asc':
                    $query->orderBy('deadline', 'asc');
                    break;
                case 'deadline_desc':
                    $query->orderBy('deadline', 'desc');
                    break;
            }
        }

        $entrysheets = $query->paginate(10); // ページネーションを追加

        return view('entrysheet.home', compact('entrysheets'));
    }

    /**
     * add googlecalendar
     */

    // private function addToGoogleCalendar(Entrysheet $entrysheet)
    // {
    //     $user = Auth::user();
    //     if (!$user->google_access_token) {
    //         \Log::error('Google カレンダー登録エラー: ユーザーが未認証');
    //         return;
    //     }

    //     $client = new Google_Client();
    //     $client->setClientId(env('GOOGLE_CLIENT_ID'));
    //     $client->setClientSecret(env('GOOGLE_CLIENT_SECRET'));
    //     $client->setAccessToken($user->google_access_token);

    //     // アクセストークンを更新
    //     if ($client->isAccessTokenExpired()) {
    //         $newToken = $this->refreshGoogleAccessToken($user);
    //         if (!$newToken) {
    //             \Log::error('Google カレンダー登録エラー: アクセストークンの更新に失敗');
    //             return;
    //         }
    //         $client->setAccessToken($newToken);
    //     }

    //     $service = new Google_Service_Calendar($client);
    //     $event = new Google_Service_Calendar_Event([
    //         'summary' => $entrysheet->company->name . ':ES締切',
    //         'start' => ['date' => $entrysheet->deadline],
    //         'end' => ['date' => $entrysheet->deadline],
    //     ]);

    //     $calendarId = 'primary';
    //     $event = $service->events->insert($calendarId, $event);

    //     // Google カレンダーのイベント ID を保存
    //     $entrysheet->update(['google_event_id' => $event->getId()]);
    //     \Log::info('Google カレンダー登録成功: ' . $event->getId());
    // }
    // /**
    //  * update googlecalendar
    //  */

    // private function updateGoogleCalendarEvent(Entrysheet $entrysheet)
    // {
    //     $user = Auth::user();
    //     if (!$user->google_access_token || !$entrysheet->google_event_id) {
    //         \Log::error('Googleカレンダー更新エラー: イベントIDまたは認証情報が不足');
    //         return;
    //     }

    //     $client = new Google_Client();
    //     $client->setAccessToken($user->google_access_token);

    //     // **アクセストークンが期限切れならリフレッシュ**
    //     if ($client->isAccessTokenExpired()) {
    //         $newToken = $this->refreshGoogleAccessToken($user);
    //         if (!$newToken) {
    //             \Log::error('Google カレンダー更新エラー: アクセストークンの更新に失敗');
    //             return;
    //         }
    //         $client->setAccessToken($newToken);
    //     }

    //     $service = new Google_Service_Calendar($client);
    //     $calendarId = 'primary';

    //     try {
    //         // **既存のイベントを取得**
    //         $event = $service->events->get($calendarId, $entrysheet->google_event_id);

    //         // **イベント内容を更新**
    //         $event->setSummary($entrysheet->company->name . ':ES締切');
    //         $event->setStart(new Google_Service_Calendar_EventDateTime(['date' => $entrysheet->deadline]));
    //         $event->setEnd(new Google_Service_Calendar_EventDateTime(['date' => $entrysheet->deadline]));

    //         // **Googleカレンダーを更新**
    //         $updatedEvent = $service->events->update($calendarId, $event->getId(), $event);

    //         \Log::info('Googleカレンダー更新成功: ' . $updatedEvent->getId());
    //     } catch (\Exception $e) {
    //         \Log::error('Googleカレンダー更新エラー: ' . $e->getMessage());
    //     }
    // }

    // /**
    //  * delete googlecalendar
    //  */
    // private function deleteGoogleCalendarEvent(Entrysheet $entrysheet)
    // {
    //     $user = Auth::user();
    //     if (!$user->google_access_token || !$entrysheet->google_event_id) {
    //         \Log::error('Googleカレンダー削除エラー: イベントIDまたは認証情報が不足');
    //         return;
    //     }

    //     $client = new Google_Client();
    //     $client->setAccessToken($user->google_access_token);

    //     if ($client->isAccessTokenExpired()) {
    //         $newToken = $this->refreshGoogleAccessToken($user);
    //         if (!$newToken) {
    //             \Log::error('Google カレンダー削除エラー: アクセストークンの更新に失敗');
    //             return;
    //         }
    //         $client->setAccessToken($newToken);
    //     }

    //     $service = new Google_Service_Calendar($client);
    //     $calendarId = 'primary';

    //     try {
    //         $service->events->delete($calendarId, $entrysheet->google_event_id);
    //         \Log::info('Googleカレンダーのイベント削除成功: ' . $entrysheet->google_event_id);
    //     } catch (\Exception $e) {
    //         \Log::error('Googleカレンダーのイベント削除エラー: ' . $e->getMessage());
    //     }
    // }

    // private function refreshGoogleAccessToken($user)
    // {
    //     try {
    //         $client = new Google_Client();
    //         $client->setClientId(env('GOOGLE_CLIENT_ID'));
    //         $client->setClientSecret(env('GOOGLE_CLIENT_SECRET'));

    //         if ($user->google_refresh_token) {
    //             // **新しいアクセストークンを取得**
    //             $client->refreshToken($user->google_refresh_token);
    //             $newAccessToken = $client->getAccessToken();

    //             // **アクセストークンを更新**
    //             $user->update([
    //                 'google_access_token' => $newAccessToken['access_token'],
    //             ]);

    //             \Log::info('Google カレンダー: アクセストークンを更新成功。');
    //             return $newAccessToken['access_token'];
    //         } else {
    //             \Log::error('Google カレンダー: リフレッシュトークンがありません。');
    //             return null;
    //         }
    //     } catch (\Exception $e) {
    //         \Log::error('Google カレンダー: アクセストークンの更新に失敗 - ' . $e->getMessage());
    //         return null;
    //     }
    // }

}
