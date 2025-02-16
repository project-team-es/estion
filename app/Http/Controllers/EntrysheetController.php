<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEntrysheetRequest;
use App\Http\Requests\UpdateEntrysheetRequest;

use App\Models\Entrysheet;
use App\Models\Company;
use App\Models\Industry;

use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;
use Illuminate\Support\Facades\View as ViewClass;

use Mpdf\Mpdf;
use Barryvdh\DomPDF\Facade\Pdf;

class EntrysheetController extends Controller implements HasMiddleware
{
    public function home(Request $request): View{
        $entrysheets = Entrysheet::where('user_id', Auth::id())->with('company')->get();
        return view('entrysheet.home', compact('entrysheets'));
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
            'その他の就活イベント'
        ];
    
        return view('entrysheet.create', compact('industries', 'companies','presetTitles'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEntrysheetRequest $request)
    {
        $entrysheet = Entrysheet::create([
            'title' => $request->title,
            'status' => $request->status,
            'deadline' => $request->deadline,
            'company_id' => $request->company_id,
            'user_id' => Auth::id(),
        ]);
        return redirect()->route('entrysheet.show', ['entrysheet' => $entrysheet->id])->with('success', 'エントリーシートが登録されました！');
    }

    /**
     * Display the specified resource.
     */
    public function show(Entrysheet $entrysheet)
    {
        $entrysheet->load('contents');
        return view('entrysheet.show', compact('entrysheet'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Entrysheet $entrysheet)
    {
        $companies = Company::where('user_id', Auth::id())->get();
        $presetTitles = [
            '夏インターン',
            '秋・冬インターン',
            '長期インターン',
            '本選考',
            '説明会',
            'アンケート',
            'OB・OG訪問',
            'その他の就活イベント'
        ];
        return view('entrysheet.edit', compact('entrysheet', 'companies','presetTitles'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEntrysheetRequest $request, Entrysheet $entrysheet)
    {
        $entrysheet->update([
            'title' => $request->title,
            'status' => $request->status,
            'deadline' => $request->deadline,
            'company_id' => $request->company_id,
        ]);

        return redirect()->route('entrysheet.show', $entrysheet->id)->with('success', 'エントリーシートを更新しました！');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Entrysheet $entrysheet)
    {
        $entrysheet->delete();

        return redirect()->route('entrysheet')->with('success', 'エントリーシートを削除しました。');
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

    public function search(Request $request)
    {
        $query = EntrySheet::where('user_id', Auth::id());

        // 企業名で検索
        if ($request->filled('search')) {
            $query->whereHas('company', function ($query) use ($request) {
                $query->where('name', 'like', '%' . $request->search . '%');
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
}
