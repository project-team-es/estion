<x-guest-layout>
    <div class="w-full max-w-lg mt-6 px-8 py-8 bg-white border rounded-[12px]">
        <h2 class="text-2xl font-bold text-gray-800 text-center mb-4">お問い合わせ</h2>

        @if (session('success'))
            <p class="text-green-600 text-center mb-4">{{ session('success') }}</p>
        @endif

        <form method="POST" action="{{ route('contact.send') }}">
            @csrf

            <div class="mt-6">
                <x-input-label for="name" :value="__('名前')" />
                <x-text-input id="name" class="block mt-2 w-full border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500 px-4 py-2" type="text" name="name" required autofocus />
            </div>

            <div class="mt-6">
                <x-input-label for="email" :value="__('メールアドレス')" />
                <x-text-input id="email" class="block mt-2 w-full border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500 px-4 py-2" type="email" name="email" required />
            </div>

            <div class="mt-6">
                <x-input-label for="message" :value="__('メッセージ')" />
                <textarea id="message" name="message" rows="4" class="block mt-2 w-full border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500 px-4 py-2" required></textarea>
            </div>

            <div class="mt-6">
                <x-primary-button class="w-full bg-[#D9D9D9] text-black py-3 flex justify-center items-center rounded-[12px]">
                    {{ __('送信') }}
                </x-primary-button>
            </div>
        </form>
    </div>
</x-guest-layout>