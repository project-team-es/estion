<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>エントリーシート締切リマインド</title>
</head>
<body>
    <p>{{ $entrysheet->user->name }} さん</p>
    
    <p>エントリーシート「<strong>{{ $entrysheet->title }}</strong>」の締切が近づいています。</p>
    @php
    use Carbon\Carbon;
    $deadline = Carbon::parse($entrysheet->deadline);
    @endphp

<p>締切日: <strong>{{ $deadline->format('Y年m月d日') }}</strong></p>

    
    <p>締切日: <strong>{{ $entrysheet->deadline->format('Y年m月d日') }}</strong></p>
    
    <p>お忘れなくご対応ください。</p>

    <p>詳細はこちら: <a href="{{ route('entrysheet.show', $entrysheet->id) }}">{{ route('entrysheet.show', $entrysheet->id) }}</a></p>

    <p>※このメールは自動送信されています。</p>
</body>
</html>
