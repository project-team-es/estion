<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9604843985307640"
        crossorigin="anonymous"></script>
        <title inertia>{{ config('app.name', 'Laravel') }}</title>
        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', 'resources/css/app.css'])
        @inertiaHead

        <!--  タブバーのアイコンを設定 -->
        <link rel="icon" type="image/svg+xml" href="{{ asset('image/estion_logo.svg') }}">
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>