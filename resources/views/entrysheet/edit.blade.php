<x-app-layout>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden rounded-[12px] border">
                <div class="px-8 py-6 text-gray-900">

                    <h2 class="text-2xl font-bold mb-6">エントリーシートを編集</h2>

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

                    <!-- 更新フォーム -->
                    <form method="POST" action="{{ route('entrysheet.update', $entrysheet->id) }}">
                        @csrf
                        @method('PUT')

                        <!-- タイトル -->
                        <div class="mb-5">
                            <label for="title" class="block text-gray-700 font-bold mb-2">タイトル</label>
                            <select name="title" id="title" class="w-full border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500" required>
                                <option value="">タイトルを選択</option>
                                @foreach ($presetTitles as $title)
                                    <option value="{{ $title }}" {{ $entrysheet->title == $title ? 'selected' : '' }}>{{ $title }}</option>
                                @endforeach
                            </select>
                        </div>

                        <!-- ステータス -->
                        <div class="mb-5">
                            <label for="status" class="block text-gray-700 font-bold mb-2">ステータス</label>
                            <select name="status" id="status" class="w-full border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500 px-4 py-2">
                                <option value="下書き" {{ $entrysheet->status == '下書き' ? 'selected' : '' }}>下書き</option>
                                <option value="提出済み" {{ $entrysheet->status == '提出済み' ? 'selected' : '' }}>提出済み</option>
                                <option value="書類通過" {{ $entrysheet->status == '書類通過' ? 'selected' : '' }}>書類通過</option>
                                <option value="書類落ち" {{ $entrysheet->status == '書類落ち' ? 'selected' : '' }}>書類落ち</option>
                            </select>
                        </div>

                        <!-- 締切日 -->
                        <div class="mb-4">
                            <label for="deadline" class="block text-gray-700 font-bold mb-2">締切日</label>
                            <div id="deadline-wrapper" class="relative flex items-center border border-gray-300 rounded-[12px] cursor-pointer">
                                <input type="date" name="deadline" id="deadline" 
                                    value="{{ old('deadline', $entrysheet->deadline ? substr($entrysheet->deadline, 0, 10) : '') }}"
                                    class="pl-4 pr-4 py-2 w-full rounded-[12px] appearance-none">
                            </div>
                        </div>

                        <!-- 企業 -->
                        <div class="mb-5">
                            <label for="company_id" class="block text-gray-700 font-bold mb-2">企業</label>
                            <select name="company_id" id="company_id" class="w-full border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500 px-4 py-2">
                                @foreach ($companies as $company)
                                    <option value="{{ $company->id }}" {{ $entrysheet->company_id == $company->id ? 'selected' : '' }}>
                                        {{ $company->name }}
                                    </option>
                                @endforeach
                            </select>
                        </div>

                        <!-- 更新ボタン -->
                        <div class="flex justify-end space-x-3">
                            <a href="{{ route('entrysheet.show', $entrysheet->id) }}" class="bg-gray-500 text-white px-4 py-2 rounded-[12px] hover:bg-gray-400">
                                キャンセル
                            </a>
                            <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded-[12px] hover:bg-blue-500">
                                更新
                            </button>
                        </div>
                    </form>

                    <!-- 削除ボタン -->
                    <div class="mt-6">
                        <form method="POST" action="{{ route('entrysheet.destroy', $entrysheet->id) }}" 
                            onsubmit="return confirm('このエントリーシートの内容が全て削除されます！\n本当によろしいですか？');">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="bg-red-600 text-white px-6 py-2 rounded-[12px] hover:bg-red-500">
                                削除
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </div>
</x-app-layout>

<script>
    document.getElementById('deadline-wrapper').addEventListener('click', function() {
        document.getElementById('deadline').showPicker();
    });
</script>