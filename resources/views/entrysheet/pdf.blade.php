<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>エントリーシート PDF</title>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9604843985307640"
     crossorigin="anonymous"></script>
    <style>
        body {
            font-family: "ipaexg";
            font-size: 12px;
        }
        h1 {
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 20px;
        }
        .question {
            font-weight: bold;
            margin-top: 10px;
        }
        .answer {
            margin-bottom: 15px;
        }
    </style>
</head>
<body>
    <h1>{{ $entrysheet->company->name }} - {{ $entrysheet->title }}</h1>
    
    <p><strong>ステータス:</strong> {{ $entrysheet->status }}</p>
    <p><strong>締切日:</strong> {{ $entrysheet->deadline ?? '未設定' }}</p>

    <hr>

    <h2>質問と回答</h2>
    @foreach($entrysheet->contents as $content)
        <p class="question">{{ $content->question }}</p>
        <p class="answer">{{ $content->answer }}</p>
    @endforeach
</body>
</html>