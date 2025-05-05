<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;
use Illuminate\Routing\Controllers\HasMiddleware;

use App\Models\Company;
use App\Models\Industry;
use Inertia\Inertia;
use Inertia\Response;


use App\Http\Requests\StoreCompanyRequest;
use App\Http\Requests\UpdateCompanyRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CompanyController extends Controller implements HasMiddleware
{
    public function index(Request $request): Response
    {
        $companies = Company::where('user_id', Auth::id())->get();
        $industries = Industry::all();

        return Inertia::render('App/Company/Index/index', [
            'companies' => $companies,
            'industries' => $industries,
        ]);
    }

    public static function middleware(): array
    {
        return [
            'auth',
            'verified'
        ];
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $industries = Industry::all();
        return Inertia::render('App/Company/Create/index', [
            'industries' => $industries
        ]);
    }
    // return view('company.create', compact('industries'));
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCompanyRequest $request)
    {
        // 企業を作成
        $company = Company::create([
            'name' => $request->name,
            'homepage' => $request->homepage,
            'mypage' => $request->mypage,
            'loginid' => $request->loginid,
            'status' => $request->status,
            'process' => $request->process,
            'user_id' => Auth::id(),
            'industry_id' => $request->industry_id,
        ]);

        return redirect()->route('company.show', $company->id)->with('success', '企業が登録されました！');
    }

    /**
     * Display the specified resource.
     */
    public function show(Company $company)
    {
        $company->load(['entrysheets', 'files', 'industry']);
        return Inertia::render('App/Company/Show/index', [
            'company' => $company,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Company $company)
    {
        $industries = Industry::all(); 
        return view('company.edit', compact('company', 'industries'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Company $company)
    {
    $request->validate([
        'name' => 'required|string|max:255',
        'industry_id' => 'required|exists:industries,id',
        'homepage' => 'nullable|url',
        'loginid' => 'nullable|string|max:50',
        'mypage' => 'nullable|url',
        'status' => 'nullable|string|max:255',
        'process' => 'nullable|string|max:255',
    ]);

    $company->update($request->all());

    return redirect()->route('company.show', $company)->with('success', '企業情報を更新しました');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        // ユーザーがこの企業を削除できるか確認
        if ($company->user_id !== Auth::id()) {
            abort(403, '権限がありません');
        }

        DB::beginTransaction();
        try {
            // もし `deleted_at` カラムがある場合は `forceDelete()` で物理削除
            $company->forceDelete();

            DB::commit();
            return response()->json(['message' => '企業を削除しました。']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => '削除に失敗しました。'], 500);
        }
    }


    public function search(Request $request): View
    {
        $query = Company::where('user_id', Auth::id());

        // 企業名で検索
        if ($request->has('search') && $request->search) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }
        //業界でフィルタリング
        if ($request->has('industry_ids') && $request->industry_ids) {
            $query->whereIn('industry_id', $request->industry_ids);
        }    

        // 結果を取得
        $companies = $query->get();
        $industries = Industry::all();
        return view('company.home', compact('companies','industries'));
    }

}
