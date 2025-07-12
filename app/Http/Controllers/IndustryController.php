<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreIndustryRequest;
use App\Http\Requests\UpdateIndustryRequest;
use Inertia\Inertia;
use App\Models\Industry;
use App\Models\Company;

use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;

class IndustryController extends Controller implements HasMiddleware
{
    public function home(Request $request): View{
        $user = Auth::user();
        $industries = $user->industries()->get();
        
        return view('industry.home', compact('industries'));
    }

    public function create(Request $request): View{
        return view('industry.create');
    }

    public static function middleware(): array
    {
        return [
            'auth',
            'verified'
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        return Inertia::render('App/Industry/index');
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
