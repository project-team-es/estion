<x-guest-layout>
    <x-slot:title>ログイン</x-slot:title>
    <div class="w-full max-w-lg mt-6 px-8 py-8 bg-white border rounded-[12px]">
        <h2 class="text-2xl font-bold text-gray-800 text-center mb-4">ログイン</h2>
        
        <!-- Google OAuth icon -->
        <div class="flex justify-center">
            <a href="{{ route('auth.google') }}" class="hover:scale-110">
                <img src="{{ asset('image/auth/google_icon.png') }}" alt="Google Logo" width="40" height="40">
            </a>  
        </div>

        <!-- Session Status -->
        <form method="POST" action="{{ route('login') }}">
            @csrf
            <!-- メールアドレス -->
            <div class="mt-6">
                <x-input-label for="email" :value="__('メールアドレス')" class="text-[#252525]" />
                <x-text-input id="email" class="block mt-2 w-full border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500 px-4 py-2" 
                              type="email" name="email" :value="old('email')" required autofocus autocomplete="username" />
                <x-input-error :messages="$errors->get('email')" class="mt-1" />
            </div>

            <!-- パスワード -->
            <div class="mt-6">
                <x-input-label for="password" :value="__('パスワード')" class="text-[#252525]" />
                <x-text-input id="password" class="block mt-2 w-full border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
                              type="password" name="password" required autocomplete="current-password" />
                <x-input-error :messages="$errors->get('password')" class="mt-1" />
            </div>

            <!-- ログイン情報を保存 -->
            <div class="block mt-6">
                <label for="remember_me" class="inline-flex items-center">
                    <input id="remember_me" type="checkbox" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" name="remember">
                    <span class="ms-2 text-sm text-black font-bold">{{ __('ログイン情報を保存') }}</span>
                </label>
            </div>

            <!-- ボタンエリア -->
            <div class="mt-6 space-y-3">
                <!-- ログインボタン -->
                <x-primary-button class="w-full bg-[#D9D9D9] text-black py-3 flex items-center justify-center text-center rounded-[12px]">
                    {{ __('ログイン') }}
                </x-primary-button>

                <!-- パスワードを忘れた方 -->
                @if (Route::has('password.request'))
                    <a class="block text-right text-sm text-gray-600 hover:text-gray-900 transition" href="{{ route('password.request') }}">
                        {{ __('パスワードを忘れた方') }}
                    </a>
                @endif

                <!-- 区切り線 -->
                <div class="border-t border-[#909090] opacity-50 my-3"></div>

                <!-- 新規登録はこちら -->
                <div class="pt-6 flex justify-center">  
                    <a class="text-center text-sm text-[#252525] hover:text-gray-900 transition font-bold" href="{{ route('register') }}">
                        {{ __('新規登録はこちら') }}
                    </a>
                </div>
            </div>
        </form>
    </div>
</x-guest-layout>