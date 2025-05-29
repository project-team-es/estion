<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        
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