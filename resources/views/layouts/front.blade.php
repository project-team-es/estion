<!DOCTYPE html>
<html lang="ja">
    <head>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" type="image/svg+xml" href="{{ asset('image/estion_logo.svg') }}">
        <title>{{ $title ?? env('APP_NAME') }}</title>
        @vite('resources/css/app.css')

        @isset($earlyAssetLoad)
            {!! $earlyAssetLoad !!}
        @endisset
    </head>
    <!-- 背景界の画像を挿入 -->
        <body class="bg-cover bg-center bg-no-repeat h-auto w-full font-sans"
        style="background-image: url('/image/front/paper.png');">


    @include('layouts.front.nav')

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-16 text-center">
    {{ $slot }}
    </main>

    <!-- Footer -->
    @include('layouts.front.footer')

    <!-- JavaScript for Hamburger Menu -->
    @isset($js)
        <script>
            {{$js}}
        </script>
    @endisset

    @isset($lateAssetLoad)
        {!! $lateAssetLoad !!}
    @endisset
    </body>
</html>
