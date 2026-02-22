<?php

namespace App\Http\Controllers;

use App\Models\Analysis;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AnalysisController extends Controller
{
    /**
     * 自己分析一覧画面を表示する
     */
    public function index()
    {
        $user = Auth::user();
        $analyses = Analysis::where('user_id', $user->id)->get();

        if ($analyses->isEmpty()) {
            $defaultQuestions = [
                '性格・人柄：あなたはご友人やご家族からどのように表現されますか？よく言われることを3点教えてください。',
                '経歴：幼少期～大学までのご経験を教えてください。',
                'ガクチカ-1：経歴で記入した幼少期～大学時代までの経験の中で、最も自分に影響を与えたことについて、具体的な内容とあなたに与えた影響をお書きください。',
                'ガクチカ-2：大学時代に注力している研究・学業をご記入ください。',
                '将来像：あなたが目指す将来像。',
            ];

            foreach ($defaultQuestions as $question) {
                Analysis::create([
                    'user_id' => auth()->id(),
                    'question' => $question,
                    'answer' => '',
                ]);
            }

            $analyses = Analysis::where('user_id', auth()->id())->get();
        }

        return view('analysis.index', compact('analyses'));
    }

    /**
     * 複数項目の一括更新処理
     */
    public function bulkUpdate(Request $request)
    {
        // 既存の自己分析の回答を更新
        $answers = $request->input('answers', []);
        foreach ($answers as $id => $answer) {
            $analysis = Analysis::find($id);
            if ($analysis && $analysis->user_id == Auth::id()) {
                $analysis->answer = $answer;
                $analysis->save();
            }
        }

        // 削除された項目のIDを hidden input から取得
        $deletedIds = $request->input('deleted_ids');
        if ($deletedIds) {
            $ids = explode(',', $deletedIds);
            foreach ($ids as $id) {
                $analysis = Analysis::find($id);
                if ($analysis && $analysis->user_id == Auth::id()) {
                    $analysis->delete();
                }
            }
        }

        // 新規追加された質問と回答の処理
        $newQuestions = $request->input('new_questions', []);
        $newAnswers = $request->input('new_answers', []);
        $user = Auth::user();
        foreach ($newQuestions as $index => $question) {
            if ($question) {
                Analysis::create([
                    'question' => $question,
                    'answer' => $newAnswers[$index] ?? '',
                    'user_id' => $user->id,
                ]);
            }
        }

        return redirect()->route('analysis.index')->with('success', '自己分析を更新しました。');
    }

    /**
     * 個別編集画面を表示する
     */
    public function edit(Analysis $analysis)
    {
        // 自身のデータかチェック
        if ($analysis->user_id != Auth::id()) {
            abort(403);
        }

        return view('analysis.edit', compact('analysis'));
    }

    /**
     * 個別の自己分析を更新する
     */
    public function update(Request $request, Analysis $analysis)
    {
        if ($analysis->user_id != Auth::id()) {
            abort(403);
        }

        $request->validate([
            'question' => 'required|string|max:255',
            'answer' => 'nullable|string',
        ]);

        $analysis->update([
            'question' => $request->input('question'),
            'answer' => $request->input('answer'),
        ]);

        return redirect()->route('analysis.index')->with('success', '自己分析を更新しました。');
    }
}
