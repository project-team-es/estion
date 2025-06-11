<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Http\Request;
use Gemini\Laravel\Facades\Gemini;

use App\Models\Content;
use App\Models\EntrySheet;
use App\Models\Analysis;
use Inertia\Inertia;
use Illuminate\Support\Str;

class GeminiController extends Controller implements HasMiddleware
{
    public function index(Request $request)
    {
        \Log::info("GeminiController index method reached for /interview/start route with request: " . json_encode($request->all()));
        
        $entrysheet = EntrySheet::findOrFail($request->input('entrysheet_id'));
        $content = Content::findOrFail($request->input('content_id'));

        $question = $content->question;
        $answer = $content->answer;
        $interviewRequest = $request->input('interview_request', '');

        $results = $this->execute($question, $answer, $interviewRequest);

        if (!is_array($results) || empty($results)) {
            return redirect()->route('entrysheet.show', ['entrysheet' => $entrysheet->id])
                ->with('error', '面接質問を取得できませんでした。もう一度試してください。');
        }

        return Inertia::render('App/Interview/InterviewResult/index', [
            'entrysheet' => $entrysheet,
            'content' => $content,
            'results' => $results,
        ]);
    }

    public function index_analysis(Request $request)
    {
        $analysis = Analysis::findOrFail($request->input('analysis_id'));

        $question = $analysis->question;
        $answer = $analysis->answer;
        $interviewRequest = $request->input('interview_request', '');

        $result = $this->execute($question, $answer, $interviewRequest);
        $questions = $result;

        if (!is_array($result) || empty($result)) {
            return redirect()->route('analysis.index')
                ->with('error', '面接質問を取得できませんでした。もう一度試してください。');
        }

        return view('interview.index_analysis', compact('analysis', 'questions'));
    }

    public function execute($question, $answer, $interviewRequest = '')
{
    \Log::info("Executing GeminiController::execute method.");
    try{
        $instruction = "あなたは優秀な新卒採用の面接官です。\n"
            . "入力は新卒学生が提出したエントリーシートの質問と回答です。\n"
            . "回答に対して深堀りの質問を5つ、JSON配列形式の文字列で出力してください。\n"
            . "指示詞（「この」「その」など）は使用しないでください。\n"
            . "出力は **必ず** JSON配列文字列 **のみ** としてください。他の文字、記号、Markdownのコードブロックマーカー（例: ```json）、説明文は一切含めないでください。\n"
            . "文字列は `[` で始まり、`]` で終わる必要があります。\n"
            . "他の情報は一切含めないでください。\n"
            . "以下の例に厳密に従ってください。\n\n"
            . "### **出力例:**\n"
            . "[\"あなたの強みは何ですか？\", \"学生時代に最も力を入れたことは何ですか？\", \"経験から何を学びましたか？\", \"なぜ弊社を志望するのですか？\", \"当社のどの事業に興味がありますか？\"]\n"
            . "\n"
            . "この形式以外の回答をしてはいけません。";

        if (!empty($interviewRequest)) {
            $instruction .= "\n\n【追加指示】\n"
                . "以下のリクエストを考慮して質問を生成してください。\n"
                . "リクエスト内容: \"$interviewRequest\"";
        }

        $toGeminiCommand = "{$instruction}\n\n質問:\n{$question}\n\n回答:\n{$answer}";

        \Log::info("Calling Gemini API with command: " . Str::limit($toGeminiCommand, 500));
        $response = Gemini::generativeModel(model: 'gemini-2.0-flash')->generateContent($toGeminiCommand);
        \Log::info("Gemini API response object received.");

        $rawResult = $response ? $response->text() : null;
        \Log::info("Raw Gemini API result: " . ($rawResult ? Str::limit($rawResult, 500) : 'null'));

        if ($rawResult === null) {
            \Log::warning("Gemini API returned null raw result.");
            return [];
        }

        $cleanedResult = preg_replace('/^```(?:json|php)?\s*|\s*```$/s', '', $rawResult);
        $cleanedResult = trim($cleanedResult);
        \Log::info("Cleaned Gemini API result for JSON decode: " . Str::limit($cleanedResult, 500));

        if (substr($cleanedResult, 0, 3) === '"""' && substr($cleanedResult, -3) === '"""') {
            $cleanedResult = substr($cleanedResult, 3, -3);
            $cleanedResult = trim($cleanedResult);
        }

        else if (substr($cleanedResult, 0, 1) === '"' && substr($cleanedResult, -1) === '"') {
            $tempDecoded = json_decode($cleanedResult, true);
            if (json_last_error() === JSON_ERROR_NONE && is_string($tempDecoded)) {
                $nestedJson = json_decode($tempDecoded, true);
                if (json_last_error() === JSON_ERROR_NONE && is_array($nestedJson)) {
                    $cleanedResult = $tempDecoded;
                }
            } else if (json_last_error() !== JSON_ERROR_NONE) {
                $cleanedResult = trim($cleanedResult, '"');
            }
        }

        $decodedArray = json_decode($cleanedResult, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            \Log::error("JSON decode error in execute method: " . json_last_error_msg() . ". Attempting regex fallback. Raw: " . Str::limit($cleanedResult, 500));
            if (preg_match('/(\[.*\])/s', $cleanedResult, $matches)) {
                $jsonCandidate = $matches[1];
                $decodedArray = json_decode($jsonCandidate, true);
                if (json_last_error() !== JSON_ERROR_NONE) {
                    return [];
                }
            } else {
                \Log::error("No JSON array found in result after regex attempt. Cleaned result: " . Str::limit($cleanedResult, 500));
                return [];
            }
        }
        \Log::info("Successfully decoded Gemini API result. Returning array.");
        return is_array($decodedArray) ? $decodedArray : [];

    }catch (Exception $e) {
        // executeメソッド内で発生したすべての例外を捕捉
        \Log::error("Exception in GeminiController::execute: " . $e->getMessage() . " - Trace: " . $e->getTraceAsString());
        // 例外発生時は空の配列を返すことで、indexメソッドの !empty($results) に引っかかるようにする
        return [];
    }
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