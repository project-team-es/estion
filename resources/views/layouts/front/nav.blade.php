<nav class="fixed top-0 left-0 w-full bg-transparent py-4 z-50">
    <div class="w-full px-6 py-3 flex justify-between items-center font-roboto">
        <!-- ロゴ -->
        <a href="{{ route('front.home') }}" class="text-4xl font-bold text-black tracking-wide pl-4 sm:pl-12">
            estion.
        </a>

        @if (!request()->routeIs('login') && !request()->routeIs('register'))
            <div class="hidden md:flex space-x-10 font-bold">
                <a href="{{ route('contact.create') }}" class="text-black hover:text-gray-300 transition">お問い合わせ</a>
                @if (Route::has('login'))
                    @auth
                        <a href="{{ url('/dashboard') }}" class="text-black hover:text-gray-300 transition">つづきから</a>
                    @else
                        <a href="{{ route('login') }}" class="text-black hover:text-gray-300 transition">はじめる</a>
                    @endauth
                @endif
            </div>
        @endif

        <!-- モバイル用ハンバーガーメニュー -->
        <div class="-me-2 flex items-center md:hidden">
            <button id="menu-toggle" class="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-gray-500 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out">
                <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path id="menu-open" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    <path id="menu-close" class="hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </div>

    <!-- モバイルメニュー -->
    <div id="mobile-menu" class="hidden absolute top-20 left-0 w-full bg-black bg-opacity-80 text-white flex flex-col items-center space-y-4 py-6 transition-all duration-300">
        <a href="#" class="hover:text-gray-300 transition px-6 py-3">お問い合わせ</a>
        @if (Route::has('login'))
            @auth
                <a href="{{ url('/dashboard') }}" class="hover:text-gray-300 transition px-6 py-3">はじめる</a>
            @else
                <a href="{{ route('login') }}" class="hover:text-gray-300 transition px-6 py-3">はじめる</a>
            @endauth
        @endif
    </div>
</nav>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        let menuToggle = document.getElementById("menu-toggle");
        let menu = document.getElementById("mobile-menu");
        let menuOpenIcon = document.getElementById("menu-open");
        let menuCloseIcon = document.getElementById("menu-close");

        // メニュー開閉処理
        menuToggle.addEventListener("click", function () {
            let isHidden = menu.classList.contains("hidden");

            if (isHidden) {
                menu.classList.remove("hidden");
                menuOpenIcon.classList.add("hidden");
                menuCloseIcon.classList.remove("hidden");
            } else {
                menu.classList.add("hidden");
                menuOpenIcon.classList.remove("hidden");
                menuCloseIcon.classList.add("hidden");
            }
        });

        // ウィンドウリサイズ時にメニューを閉じる処理
        window.addEventListener("resize", function () {
            if (window.innerWidth >= 768) { // md: 768px 以上になったら閉じる
                menu.classList.add("hidden");
                menuOpenIcon.classList.remove("hidden");
                menuCloseIcon.classList.add("hidden");
            }
        });
    });
</script>