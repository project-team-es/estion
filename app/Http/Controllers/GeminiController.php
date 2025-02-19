<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Gemini\Laravel\Facades\Gemini;

use Illuminate\Support\Str;

class GeminiController extends Controller
{
    public function index()
    {
        return view('interview.index');
    }
    
    public function execute(Request $request)
    {

        $instruction = "あなたは優秀な新卒採用の面接官です。\n"
                        . "入力は新卒学生が提出したエントリーシートの質問と回答です\n"
                        . "回答に対して深堀りの質問を5つ以上出力して下さい\n"
                        . "ただし、出力は **必ず** 配列形式にしてください。\n"
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

        $toGeminiCommand = $instruction . $request->toGeminiText . "\n```";

        $task = $request->toGeminiText;

        $result = Gemini::geminiPro()->generateContent($toGeminiCommand)->text();
        
        return view('interview.index', compact('task', 'result'));
    }
}