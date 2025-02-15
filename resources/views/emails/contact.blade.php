<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>お問い合わせ</title>
</head>
<body>
    <p>以下の内容でお問い合わせがありました。</p>

    <p><strong>名前:</strong> {{ $data['name'] }}</p>
    <p><strong>メールアドレス:</strong> {{ $data['email'] }}</p>
    <p><strong>メッセージ:</strong><br>{{ nl2br(e($data['message'])) }}</p>
</body>
</html>
