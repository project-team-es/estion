<!--
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{config('app.name')}}</title>

    <style>
        body {background: #bae6fd;}
        h1 {margin: 30px 10px;}
        h2 {margin: 30px 10px;}
        form {display: flex; align-items: flex-end; margin: 0 0 20px 10px}
        textarea {margin-right: 10px; padding: 5px 10px; width: 200px; height: 100px;}
        button {padding: 5px 10px;height: 30px;}
        p {margin: 5px 0 0 10px;}
    </style>
</head>
-->
<x-app-layout>
    <body class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <div class="bg-white rounded-[12px] p-6 w-full max-w-2xl border border-gray-300">

            <form action="{{ route('interview.execute') }}" method="post" class="w-full">
                @csrf
                <label for="toGeminiText" class="block text-gray-600 font-semibold mb-2">入力してください:</label>
                <textarea 
                    name="toGeminiText" 
                    id="toGeminiText" 
                    class="w-full h-24 p-3 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="ここに入力..."
                    autofocus>@isset($task){{ $task }}@endisset</textarea>

                <button 
                    type="submit" 
                    class="w-full mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-[12px] hover:bg-blue-600 transition duration-300">
                    送信
                </button>
            </form>

            <hr class="my-6">

            @isset($result)
            <div class="bg-gray-50 border border-gray-300 rounded-[12px] p-4 mt-4">
                <h2 class="text-lg font-semibold text-gray-700 mb-2">結果:</h2>
                <p class="text-gray-800">
                @php
                    $questions = json_decode($result, true);
                @endphp
                @foreach($questions as $question)
                    {!! $question !!} <br>
                @endforeach
                </p>
            </div>
            
            @endisset
        </div>
    </body>
</x-app-layout>