<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Company;
use App\Models\Industry;
use App\Models\Content;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // ログインユーザーに紐づくエントリーシートとブックマークを取得
        $bookmarks = $user->bookmark()->get();
        // ログインユーザーに紐づく業界のみ取得
        $industries = $user->industries()->get();
        // 締切間近ES取得
        // 締切間近ES取得（過去の日付を除外）
        $entrysheets = $user->entrysheet()
        ->where('deadline', '>=', now()) // 現在の日時より未来のもののみ取得
        ->orderByRaw('ISNULL(deadline), deadline ASC')
        ->get();
        
        $contents = Content::with('entrysheet.company') // ここでEager Loading
        ->whereHas('entrysheet', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })
        ->orderBy('created_at', 'desc')
        ->get();


        //ユーザーに紐づく企業のみを取得する
        $industriesWithCompanies = $industries->mapWithKeys(function ($industry) use ($user) {
            return [
                $industry->id => $industry->companies()
                    ->where('user_id', $user->id) // ログインユーザーの企業に限定
                    ->get()
                    ->map(function ($company) {
                        return [
                            'name' => $company->name,
                            'homepage' => $company->homepage,
                            'mypage' => $company->mypage,
                            'loginid' => $company->loginid,
                            'status' => $company->status,
                            'show' => route('company.show', $company->id)
                        ];
                    })->values()->toArray()
            ];
        })->toArray();
    
        return Inertia::render('App/Dashboard/index', [
            'bookmarks' => $bookmarks,
            'industriesWithCompanies' => $industriesWithCompanies, // json_encode 不要
            'industries' => $industries,
            'entrysheets' => $entrysheets,
            'contents' => $contents,
        ]);
    }
}