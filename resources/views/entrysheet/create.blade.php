<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            エントリーシート作成
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden sm:rounded-[12px]">
                <div class="p-6 text-gray-900">
                    <h1 class="text-2xl font-bold mb-6">エントリーシートを作成</h1>

                    <!-- エラーメッセージの表示 -->
                    @if ($errors->any())
                        <div class="mb-4 p-4 bg-red-100 text-red-700 rounded-[12px]">
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    <!-- エントリーシート作成フォーム -->
                    <form method="POST" action="{{ route('entrysheet.store') }}">
                        @csrf

                        <!-- 企業選択 -->
                        <div class="mb-4">
                            <label for="company_id" class="block text-gray-700 font-bold mb-2">企業</label>
                            <select name="company_id" id="company_id" class=" border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500" required>
                                <option value="">企業を選択してください</option>
                                    @foreach ($industries as $industry)
                                        @if ($industry->companies->isNotEmpty()) <!-- 業界に企業がある場合のみ表示 -->
                                            <optgroup label="{{ $industry->name }}">
                                                @foreach ($industry->companies as $company)
                                                    <option value="{{ $company->id }}">{{ $company->name }}</option>
                                                @endforeach
                                            </optgroup>
                                        @endif
                                    @endforeach
                            </select>

                            <!-- 企業作成ボタン -->
                            <a href="{{ route('company.create') }}" class="ml-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-[12px]">
                                新しく企業を登録
                            </a>
                        </div>
                        
                        <!-- タイトル選択 -->
                        <div class="mb-4">
                            <label for="title" class="block text-gray-700 font-bold mb-2">タイトル</label>
                            <select name="title" id="title" class="w-full border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500" required>
                                <option value="">タイトルを選択</option>
                                @foreach ($presetTitles as $title)
                                    <option value="{{ $title }}">{{ $title }}</option>
                                @endforeach
                            </select>
                        </div>

                
                        <!-- ステータス -->
                        <div class="mb-4">
                            <label for="status" class="block text-gray-700 font-bold mb-2">ステータス</label>
                            <select name="status" id="status" class="w-full border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500" required>
                                <option value="">ステータスを選択</option>
                                <option value="下書き">下書き</option>
                                <option value="提出済み">提出済み</option>
                                <option value="書類通過">書類通過</option>
                                <option value="書類落ち">書類落ち</option>
                            </select>
                        </div>

                        <!-- 締切日 -->
                        <div class="mb-4">
                            <label for="deadline" class="block text-gray-700 font-bold mb-2">締切日 (任意)</label>
                            <div id="deadline-wrapper" class="relative flex items-center border border-gray-300 rounded-[12px] focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 cursor-pointer">
                                <input type="date" name="deadline" id="deadline" 
                                    class="pl-4 pr-4 py-2 w-full rounded-[12px] focus:ring-blue-500 focus:border-blue-500 appearance-none">
                            </div>
                        </div>

                        <!-- 登録ボタン -->
                        <div class="text-right">
                            <button type="submit" id="submit-button"
                                class="bg-blue-600 text-white px-6 py-3 rounded-[12px] hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400">
                                登録
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
</x-app-layout>

<script>
    document.getElementById('deadline-wrapper').addEventListener('click', function() {
        document.getElementById('deadline').showPicker();
    });

    document.querySelector("form").addEventListener("submit", function() {
        let button = document.getElementById("submit-button");
        button.disabled = true; // ボタンを無効化
        button.textContent = "登録中..."; // ボタンのテキストを変更
    });
</script>