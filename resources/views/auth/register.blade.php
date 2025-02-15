<x-guest-layout>
    <x-slot:title>新規登録</x-slot:title>

    <div class="w-full max-w-lg mt-6 px-8 py-8 bg-white border rounded-[12px]">
        <h2 class="text-2xl font-bold text-gray-800 text-center mb-4">新規登録</h2>

        <!-- Google OAuth bar -->
        <div class="flex justify-center">
            <a href="{{ route('auth.google') }}" class="hover:scale-110">
                <img src="{{ asset('image/auth/google_sign_up.png') }}" alt="Google Logo" width="150" height="50">
            </a>  
        </div>

        <form method="POST" action="{{ route('register') }}">
            @csrf
            
            <!-- 名前 -->
            <div class="mt-6">
                <x-input-label for="name" :value="__('ユーザー名')" class="text-[#252525] font-bold"/>
                <x-text-input id="name" class="block mt-2 w-full border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500 px-4 py-2" 
                              type="text" name="name" :value="old('name')" required autofocus autocomplete="name" />
                <x-input-error :messages="$errors->get('name')" class="mt-1" />
            </div>

            <!-- メールアドレス -->
            <div class="mt-6">
                <x-input-label for="email" :value="__('メールアドレス')" class="text-[#252525] font-bold"/>
                <x-text-input id="email" class="block mt-2 w-full border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500 px-4 py-2" 
                              type="email" name="email" :value="old('email')" required autocomplete="username" />
                <x-input-error :messages="$errors->get('email')" class="mt-1" />
            </div>

            <!-- パスワード -->
            <div class="mt-6">
                <x-input-label for="password" :value="__('パスワード')" class="text-[#252525] font-bold"/>
                <x-text-input id="password" class="block mt-2 w-full border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
                              type="password" name="password" required autocomplete="new-password" />
                <x-input-error :messages="$errors->get('password')" class="mt-1" />
            </div>

            <!-- パスワードの確認 -->
            <div class="mt-6">
                <x-input-label for="password_confirmation" :value="__('パスワード確認')" class="text-[#252525] font-bold"/>
                <x-text-input id="password_confirmation" class="block mt-2 w-full border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
                              type="password" name="password_confirmation" required autocomplete="new-password" />
                <x-input-error :messages="$errors->get('password_confirmation')" class="mt-1" />
            </div>

            <!-- ボタンエリア -->
            <div class="mt-6 space-y-3">
                <!-- 新規登録ボタン -->
                <x-primary-button class="w-full bg-[#D9D9D9] text-black py-3 flex items-center justify-center rounded-[12px]">
                    {{ __('登録') }}
                </x-primary-button>

                <!-- 区切り線 -->
                <div class="border-t border-[#909090] opacity-50 my-3"></div>

                <!-- すでにアカウントをお持ちの方（ログイン） -->
                <div class="pt-6 flex justify-center">
                    <a class="text-center text-sm text-[#252525] hover:text-gray-900 transition font-bold" href="{{ route('login') }}">
                        {{ __('すでにアカウントをお持ちの方はこちら') }}
                    </a>
                </div>
            </div>
        </form>
    </div>
</x-guest-layout>