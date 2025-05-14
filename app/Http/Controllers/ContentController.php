<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreContentRequest;
use App\Http\Requests\BulkUpdateContentRequest;
use App\Http\Requests\UpdateContentQuestionRequest;
use Illuminate\Routing\Controllers\HasMiddleware;

use App\Models\Content;
use App\Models\Entrysheet;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class ContentController extends Controller implements HasMiddleware
{
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
     * Show the form for editing the specified resource.
     */
    public function edit(Entrysheet $entrysheet, Content $content)
    {
        return Inertia::render('App/Entrysheet/Content/Edit/index', [
            'entrysheet' => $entrysheet,
            'content' => $content,
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
public function update(UpdateContentQuestionRequest $request, Entrysheet $entrysheet, Content $content)
{
    $content->update([
        'question' => $request->question,
        'character_limit' => $request->character_limit,
    ]);
    return redirect()->route('entrysheet.show', ['entrysheet' => $content->entrysheet_id])->with('success', '質問と文字数制限が更新されました！');
}
    /**
     * 保存ボタン押下時に各コンテンツを保存
     */
public function bulkUpdate(BulkUpdateContentRequest $request, Entrysheet $entrysheet)
{
    if ($request->has('answers')) {
        $existingAnswers = $request->input('answers', []);
        foreach ($existingAnswers as $contentId => $answer) {
            $content = $entrysheet->contents()->find($contentId);
            if ($content && is_string($answer)) {
                $content->update(['answer' => $answer]);
            }
        }
    }

        // カンマ区切りの文字列を配列に変換
        $deletedIds = $request->input('deleted_ids');
        if ($deletedIds) {
            $idsArray = explode(',', $deletedIds);
            // IDsを利用して削除処理
            Content::whereIn('id', $idsArray)->delete();
        }

        // 新規追加された設問と回答を処理する
        if ($request->has('new_questions') && $request->has('new_answers')) {
            $newQuestions = $request->input('new_questions', []);
            $newAnswers   = $request->input('new_answers', []);

            // 各新規設問をループで処理
            foreach ($newQuestions as $index => $question) {
                // 質問が空の場合はスキップ（必要に応じてバリデーションも追加）
                if (empty($question)) {
                    continue;
                }
                // 対応する回答が存在しなければ、空文字とする
                $answer = isset($newAnswers[$index]) ? $newAnswers[$index] : '';

                // $entrysheet に紐づく新規コンテンツとして作成
                $entrysheet->contents()->create([
                    'question' => $question,
                    'answer'   => $answer,
                ]);
            }
        }

        // 更新完了後、元のページへリダイレクト（flash メッセージなども利用可能）
        return redirect()->route('entrysheet.show', $entrysheet->id)
                            ->with('success', '内容が更新されました。');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Entrysheet $entrysheet, Content $content)
    {
        $content->delete();
        return redirect()->route('entrysheet.show', ['entrysheet' => $entrysheet->id])->with('success', '質問と回答が削除されました！');
    }

    public static function middleware(): array
    {
        return [
            'auth',
            'verified'
        ];
    }
}