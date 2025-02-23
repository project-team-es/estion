<x-app-layout>
    <div class="py-12">
        <div class="max-w-2xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden rounded-[12px] border p-6">
                <h2 class="text-2xl font-bold mb-4">自己分析 編集</h2>
                <form method="POST" action="{{ route('analysis.update', $analysis->id) }}">
                    @csrf
                    @method('PATCH')
                    <div class="mb-4">
                        <label for="question" class="block text-gray-700 font-semibold mb-2">質問</label>
                        <input type="text" id="question" name="question" value="{{ old('question', $analysis->question) }}" class="w-full border-gray-300 rounded-[12px] p-2" required>
                    </div>
                    <div class="mb-4">
                        <label for="answer" class="block text-gray-700 font-semibold mb-2">回答</label>
                        <textarea id="answer" name="answer" class="w-full border-gray-300 rounded-[12px] p-2" rows="4" placeholder="回答を入力">{{ old('answer', $analysis->answer) }}</textarea>
                    </div>
                    <div class="text-right">
                        <button type="submit" class="bg-green-500 text-white px-6 py-3 rounded-[12px] hover:bg-green-600">更新</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</x-app-layout>