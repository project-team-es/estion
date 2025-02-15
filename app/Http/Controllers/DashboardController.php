<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;

use App\Models\Entrysheet;
use App\Models\Bookmark;

use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;

class DashboardController extends Controller implements HasMiddleware
{
    public function home(Request $request): View {
        $user = Auth::user();
        
        // ログインユーザーに紐づく業界のみ取得
        $industries = $user->industries()->get();
        
        // ログインユーザーに紐づくエントリーシートとブックマークを取得
        $entrysheets = $user->entrysheet()->orderBy('deadline')->get();
        $bookmarks = $user->bookmark()->get();
    
        // ユーザーに紐づく企業のみを取得する
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
    
        return view('dashboard.home', [
            'industriesWithCompanies' => json_encode($industriesWithCompanies), // 直接配列で渡す
            'industries' => $industries,
            'entrysheets' => $entrysheets,
            'bookmarks' => $bookmarks
        ]);
    }
    

    public static function middleware(): array
    {
        return [
            'auth',
            'verified'
        ];
    }
}