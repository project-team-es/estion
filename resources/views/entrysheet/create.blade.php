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
                            @if(isset($company)) 
                                <p class="border border-gray-300 rounded-[12px] p-2 bg-gray-100">{{ $company->name }}</p>
                                <input type="hidden" name="company_id" value="{{ $company->id }}">
                            @else
                                <select name="company_id" id="company_id" class="border-gray-300 rounded-[12px]" required>
                                    <option value="">企業を選択してください</option>
                                    @foreach ($industries as $industry)
                                        @if ($industry->companies->isNotEmpty()) 
                                            <optgroup label="{{ $industry->name }}">
                                                @foreach ($industry->companies as $companyOption)
                                                    <option value="{{ $companyOption->id }}">{{ $companyOption->name }}</option>
                                                @endforeach
                                            </optgroup>
                                        @endif
                                    @endforeach
                                </select>
                                <a href="{{ route('company.create') }}" class="ml-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-[12px]">
                                    新しく企業を登録
                                </a>
                            @endif
                        </div>

                        <!-- タイトル選択 -->
                        <div class="mb-4">
                            <label for="title" class="block text-gray-700 font-bold mb-2">タイトル</label>
                            <select name="title" id="title" class="border-gray-300 rounded-[12px]" required>
                                <option value="">タイトルを選択</option>
                                @foreach ($presetTitles as $title)
                                    <option value="{{ $title }}">{{ $title }}</option>
                                @endforeach
                            </select>
                        </div>

                        <!-- 締切日 -->
                        <div class="mb-4">
                            <label for="deadline" class="block text-gray-700 font-bold mb-2">締切日 (任意)</label>
                            <input type="date" name="deadline" id="deadline" class="border-gray-300 rounded-[12px] w-full">
                        </div>

                        <!-- 質問入力（複数登録可能） -->
                        <div class="mb-4">
                            <label class="block text-gray-700 font-bold mb-2">質問</label>
                            <div id="questions-container">
                                <div class="question-group flex items-center mb-2">
                                    <input type="text" name="questions[]" class="border-gray-300 rounded-[12px] w-full" required>
                                    <button type="button" class="ml-2 bg-red-500 text-white px-3 py-1 rounded-[12px] remove-question hidden">削除</button>
                                </div>
                            </div>
                            <button type="button" id="add-question" class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-[12px]">＋ 質問を追加</button>
                        </div>

                        <!-- 登録ボタン -->
                        <div class="text-right">
                            <button type="submit" id="submit-button" class="bg-blue-600 text-white px-6 py-3 rounded-[12px]">
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
    document.getElementById('add-question').addEventListener('click', function() {
        let container = document.getElementById('questions-container');
        let newQuestion = document.createElement('div');
        newQuestion.classList.add('question-group', 'flex', 'items-center', 'mb-2');
        newQuestion.innerHTML = `
            <input type="text" name="questions[]" class="border-gray-300 rounded-[12px] w-full" required>
            <button type="button" class="ml-2 bg-red-500 text-white px-3 py-1 rounded-[12px] remove-question">削除</button>
        `;
        container.appendChild(newQuestion);
    });

    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-question')) {
            event.target.parentElement.remove();
        }
    });
</script>