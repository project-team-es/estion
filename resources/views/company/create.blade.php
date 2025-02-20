<x-app-layout>
    <x-slot name="title">企業登録</x-slot>

    <div class="max-w-4xl mx-auto py-12 px-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">企業登録</h2>

        @if ($errors->any())
            <div class="mb-4 p-4 bg-red-100 text-red-700 rounded-[12px]">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <div class="bg-white rounded-[12px] p-6 border">
            <form method="POST" action="{{ route('company.store') }}">
                @csrf

                <!-- 企業名 -->
                <div class="mb-4">
                    <label for="name" class="block text-gray-700 font-bold mb-2">企業名</label>
                    <input type="text" name="name" id="name" 
                           class="w-full border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500 px-4 py-2" required>
                </div>

                <!-- 業界 -->
                <div class="mb-4">
                    <label for="industry_id" class="block text-gray-700 font-bold mb-2">業界</label>
                    <select name="industry_id" id="industry_id" 
                            class="w-full border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500 px-4 py-2" required>
                        <option value="">業界を選択してください</option>
                        @foreach ($industries as $industry)
                            <option value="{{ $industry->id }}">{{ $industry->name }}</option>
                        @endforeach
                    </select>
                </div>

                <!-- ホームページ -->
                <div class="mb-4">
                    <label for="homepage" class="block text-gray-700 font-bold mb-2">ホームページURL (任意)</label>
                    <input type="url" name="homepage" id="homepage" 
                           class="w-full border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500 px-4 py-2">
                </div>

                <!-- マイページ -->
                <div class="mb-4">
                    <label for="mypage" class="block text-gray-700 font-bold mb-2">マイページURL (任意)</label>
                    <input type="url" name="mypage" id="mypage" 
                           class="w-full border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500 px-4 py-2">
                </div>

                <!-- ログインID -->
                <div class="mb-4">
                    <label for="loginid" class="block text-gray-700 font-bold mb-2">ログインID (任意)</label>
                    <input type="text" name="loginid" id="loginid" 
                           class="w-full border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500 px-4 py-2">
                </div>

                <!-- ステータス 
                <div class="mb-4">
                    <label for="status" class="block text-gray-700 font-bold mb-2">ステータス (任意)</label>
                    <input type="text" name="status" id="status" 
                           class="w-full border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500 px-4 py-2">
                </div>
                -->

                <!-- 登録ボタン -->
                <div class="text-right">
                    <button type="submit" 
                            class="bg-blue-600 text-white px-6 py-3 rounded-[12px] hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        登録
                    </button>
                </div>

            </form>
        </div>
    </div>
</x-app-layout>