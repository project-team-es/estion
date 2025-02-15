<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            質問と回答の編集
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden rounded-[12px] border">
                <div class="p-8 text-gray-900">

                    <h1 class="text-2xl font-bold mb-6">質問と回答を編集</h1>

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

                    <!-- 編集フォーム -->
                    <form method="POST" action="{{ route('content.update', ['entrysheet' => $content->entrysheet_id, 'content' => $content->id]) }}">
                        @csrf
                        @method('PUT')

                        <!-- 質問 -->
                        <div class="mb-4">
                            <label for="question" class="block text-gray-700 font-bold mb-2">質問</label>
                            <input type="text" name="question" id="question" value="{{ old('question', $content->question) }}" 
                                class="w-full border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500 px-6 py-3" required>
                        </div>

                        <!-- 文字数制限 -->
                        <div class="mb-4">
                            <label for="character_limit" class="block text-gray-700 font-bold mb-2">文字数制限 (任意)</label>
                            <input type="number" name="character_limit" id="character_limit"
                                value="{{ old('character_limit', $content->character_limit) }}"
                                class="w-full border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500 px-6 py-3">
                        </div>

                        <!-- 回答 -->
                        <div class="mb-4">
                            <label for="answer" class="block text-gray-700 font-bold mb-2">回答</label>
                            <textarea name="answer" id="answer" rows="4"
                                class="w-full border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500 px-6 py-3"
                                required>{{ old('answer', $content->answer) }}</textarea>
                            <p id="charCount" class="text-gray-600 mt-2">現在の文字数: 0</p>
                        </div>

                        <!-- 文字数同期 -->
                        <script>
                            function updateCharCount() {
                                let textarea = document.getElementById('answer');
                                let charCount = textarea.value.length;
                                document.getElementById('charCount').innerText = `現在の文字数: ${charCount}`;
                            }                           
                            document.addEventListener("DOMContentLoaded", function() {
                                updateCharCount(); 
                                document.getElementById('answer').addEventListener('input', updateCharCount); 
                            });
                        </script>

                        <!-- 更新ボタン -->
                        <div class="text-right">
                            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-[12px] hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400">
                                更新
                            </button>
                        </div>
                    </form>

                    <!-- 戻るボタン -->
                    <a href="{{ route('entrysheet.show', $content->entrysheet_id) }}" class="mt-4 inline-block bg-gray-500 text-white px-4 py-2 rounded-[12px] hover:bg-gray-400">
                        戻る
                    </a>

                </div>
            </div>
        </div>
    </div>
</x-app-layout>