<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContentRequest;
use App\Http\Requests\UpdateContentRequest;

use App\Models\Content;
use App\Models\Entrysheet;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class ContentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreContentRequest $request, Entrysheet $entrysheet)
    {
        Content::create([
            'question' => $request->question,
            'answer' => $request->answer,
            'entrysheet_id' => $entrysheet->id,
            'character_limit' => $request->character_limit,
        ]);

        return redirect()->route('entrysheet.show', $entrysheet->id)->with('success', '質問と回答が追加されました！');
    }

    /**
     * Display the specified resource.
     */
    public function show(Content $content)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Entrysheet $entrysheet, Content $content)
    {
        return view('content.edit', compact('entrysheet', 'content'));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateContentRequest $request, Entrysheet $entrysheet, Content $content)
    {
    $content->update([
        'question' => $request->question,
        'answer' => $request->answer,
        'character_limit' => $request->character_limit,
    ]);
    return redirect()->route('entrysheet.show', ['entrysheet' => $content->entrysheet_id])->with('success', '質問と回答が更新されました！');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Entrysheet $entrysheet, Content $content)
    {
        $content->delete();
        return redirect()->route('entrysheet.show', ['entrysheet' => $entrysheet->id])->with('success', '質問と回答が削除されました！');
    }
}
