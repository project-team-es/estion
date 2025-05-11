<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Http\Request;
use Gemini\Laravel\Facades\Gemini;

use App\Models\Content;
use App\Models\Entrysheet;
use App\Models\Analysis;
use Inertia\Inertia;
use Illuminate\Support\Str;

class GeminiController extends Controller implements HasMiddleware
{
    public function index(Request $request)
    {
        // `$content->id` からデータベースの `question` と `answer` を取得
        $entrysheet = EntrySheet::findOrFail($request->input('entrysheet_id'));
        $content = Content::findOrFail($request->input('content_id'));

        $question = $content->question;
        $answer = $content->answer;
        $interviewRequest = $request->input('interview_request', '');

        $result = $this->execute($question, $answer, $interviewRequest);
        $questions = $result;
        // dd($questions);
        if (!is_array($result) || empty($result)) {
            return redirect()->route('entrysheet.show', ['entrysheet' => $entrysheet->id])
                ->with('error', '面接質問を取得できませんでした。もう一度試してください。');
        }

        return view('interview.index', compact('entrysheet', 'content', 'questions'));
    }

    public function index_analysis(Request $request)
    {
        $analysis = Analysis::findOrFail($request->input('analysis_id'));

        $question = $analysis->question;
        $answer = $analysis->answer;
        $interviewRequest = $request->input('interview_request', '');

        $result = $this->execute($question, $answer, $interviewRequest);
        $questions = $result;
        // dd($questions);
        if (!is_array($result) || empty($result)) {
            return redirect()->route('analysis.index')
                ->with('error', '面接質問を取得できませんでした。もう一度試してください。');
        }

        return view('interview.index_analysis', compact('analysis', 'questions'));
    }
    
    
    public function execute($question, $answer, $interviewRequest = '')
{
        $instruction = "あなたは優秀な新卒採用の面接官です。\n"
            . "入力は新卒学生が提出したエントリーシートの質問と回答です\n"
            . "回答に対して深堀りの質問を5つ出力して下さい\n"
            . "「この」「その」などの指示詞は使用しないでください\n" 
            . "出力は **必ず** 配列形式にしてください。\n"
            . "他の情報は一切含めないでください。\n"
            . "以下の例に厳密に従ってください。\n\n"
            . "### **出力例:**\n"
            . "```\n"
            . " [" 
            . "    \"あなたの強みは何ですか？\",\n"
            . "    \"学生時代に最も力を入れたことは何ですか？\",\n"
            . "    \"その経験から何を学びましたか？\",\n"
            . "    \"なぜこの業界を志望するのですか？\",\n"
            . "    \"当社のどの事業に興味がありますか？\"\n"
            . " ]\n"
            . "```\n"
            . "この形式以外の回答をしてはいけません。";

        if (!empty($interviewRequest)) {
            $instruction .= "\n\n【追加指示】\n"
                . "以下のリクエストを考慮して質問を生成してください。\n"
                . "リクエスト内容: \"$interviewRequest\"";
        }

        $toGeminiCommand = "{$instruction}\n\n質問:\n{$question}\n\n回答:\n{$answer}";

        $response = Gemini::geminiPro()->generateContent($toGeminiCommand);
        $result = $response ? $response->text() : null;

        // **エラー処理: `$result` が `null` の場合**
        if ($result === null) {
            return [];
        }

        // **前後の余計な改行・空白・囲み文字を削除**
        $result = trim($result, "\" \n\r\t");

        // **JSON の解析**
        $decoded = json_decode($result, true);

        return $decoded;
}

    public static function middleware(): array
    {
        return [
            'auth',
            'verified'
        ];
    }
    
    public function showExpectedES(EntrySheet $entrysheet, Content $content)
    {
        return Inertia::render('App/Interview/ExpectedEs/index', [
            'entrysheet' => $entrysheet,
            'content' => $content,
        ]);
    }

    public function showExpectedAnalysis(Analysis $analysis)
    {
        return view('interview.expected_analysis', compact('analysis'));
    }



}