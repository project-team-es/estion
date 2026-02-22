<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreIndustryRequest;
use App\Http\Requests\UpdateIndustryRequest;
use App\Models\Company;
use App\Models\Industry;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;
use Inertia\Inertia;

class IndustryController extends Controller implements HasMiddleware
{
    public function home(Request $request): View
    {
        $user = Auth::user();
        $industries = $user->industries()->get();

        return view('industry.home', compact('industries'));
    }

    public function create(Request $request): View
    {
        return view('industry.create');
    }

    public static function middleware(): array
    {
        return [
            'auth',
            'verified',
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $industries = $user->industries()->get();

        $industriesWithCompanies = $industries->mapWithKeys(function ($industry) use ($user) {
            return [
                $industry->id => $industry->companies()
                    ->where('user_id', $user->id)
                    ->get()
                    ->map(function ($company) {
                        return [
                            'id' => $company->id,
                            'name' => $company->name,
                            'homepage' => $company->homepage,
                            'mypage' => $company->mypage,
                            'loginid' => $company->loginid,
                            'status' => $company->status,
                            'show' => route('company.show', $company->id),
                        ];
                    })->values()->toArray(),
            ];
        })->toArray();

        return Inertia::render('App/Industry/index', [
            'industries' => $industries,
            'industriesWithCompanies' => $industriesWithCompanies,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreIndustryRequest $request)
    {
        // ログインユーザーのIDを設定して業界を保存
        Industry::create([
            'name' => $request->name,
            'user_id' => Auth::id(), // ログインユーザーのIDを保存
        ]);

        return redirect()->route('industry')->with('success', '業界が登録されました！');
    }

    /**
     * Display the specified resource.
     */
    public function show(Industry $industry)
    {
        $companies = Company::where('industry_id', $industry->id)
            ->where('user_id', Auth::id())
            ->get();

        return view('industry.show', compact('industry', 'companies'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Industry $industry)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateIndustryRequest $request, Industry $industry)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Industry $industry)
    {
        //
    }
}
