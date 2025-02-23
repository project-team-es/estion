<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Http\Request;
use Gemini\Laravel\Facades\Gemini;

use App\Models\Content;
use App\Models\Entrysheet;

use Illuminate\Support\Str;

class GeminiController extends Controller implements HasMiddleware
{
    public function index(EntrySheet $entrysheet, Content $content)
    {
        // `$content->id` からデータベースの `question` と `answer` を取得
        $content = Content::findOrFail($content->id);
        $question = $content->question;
        $answer = $content->answer;

        $result = $this->execute($question, $answer);
        return view('interview.index', compact('entrysheet', 'content', 'result'));
    }
    
    public function execute($question, $answer)
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

        $toGeminiCommand = $instruction 
                            . "\n"
                            . "質問:\n"
                            . $question
                            . "\n"
                            . "回答:\n"
                            . $answer;

        $result = Gemini::geminiPro()->generateContent($toGeminiCommand)->text();
        
        return $result;
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
        return view('interview.expected_es', compact('entrysheet', 'content'));
    }

}