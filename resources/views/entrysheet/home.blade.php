<x-app-layout>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden sm:rounded-[12px] relative">
                <div class="p-6 text-gray-900">
                    <h2 class="text-2xl font-bold mb-4">エントリーシート管理</h2>

                    <!-- エントリーシート作成ボタン -->
                    <a href="{{ route('entrysheet.create') }}" 
                       class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-[12px]">
                        エントリーシートを作成
                    </a>

                    <!-- フィルターボタン -->
                    <button id="filterButton" 
                            class="absolute top-6 right-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-[12px]">
                        フィルターをかける
                    </button>

                    <!-- モーダル -->
                    <div id="filterModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center hidden">
                        <div class="bg-white p-8 rounded-[12px] w-96">
                            <h3 class="text-xl font-bold mb-4">フィルター</h3>

                            <!-- 検索・並び替えフォーム -->
                            <form method="GET" action="{{ route('entrysheet.search') }}">
                                <div class="flex flex-col gap-4">
                                    <!-- 企業名検索 -->
                                    <input type="text" name="search" value="{{ request('search') }}" 
                                           placeholder="企業名で検索" class="px-4 py-2 border rounded-[12px]">

                                    <!-- ステータスフィルター -->
                                    <div>
                                        <label for="status" class="block text-sm">ステータス</label>
                                        <select name="status" id="status" class="px-4 py-2 border rounded-[12px] appearance-none pr-10">
                                            <option value="">すべて</option>
                                            <option value="未設定" {{ request('status') == '未設定' ? 'selected' : '' }}>未設定</option>
                                            <option value="進行中" {{ request('status') == '進行中' ? 'selected' : '' }}>進行中</option>
                                            <option value="完了" {{ request('status') == '完了' ? 'selected' : '' }}>完了</option>
                                        </select>
                                    </div>

                                    <!-- 並び替え -->
                                    <div>
                                        <label for="order_by" class="block text-sm">並び替え</label>
                                        <select name="order_by" id="order_by" class="px-4 py-2 border rounded-[12px] appearance-none pr-10">
                                            <option value="created_at_desc" {{ request('order_by') == 'created_at_desc' ? 'selected' : '' }}>投稿順 (新しい順)</option>
                                            <option value="created_at_asc" {{ request('order_by') == 'created_at_asc' ? 'selected' : '' }}>投稿順 (古い順)</option>
                                            <option value="deadline_asc" {{ request('order_by') == 'deadline_desc' ? 'selected' : '' }}>締切順 (近い順)</option>
                                            <option value="deadline_desc" {{ request('order_by') == 'deadline_asc' ? 'selected' : '' }}>締切順 (遠い順)</option>
                                        </select>
                                    </div>

                                    <div class="flex justify-between">
                                        <button type="button" id="closeModal" 
                                                class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-[12px]">
                                            閉じる
                                        </button>
                                        <button type="submit" 
                                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-[12px]">
                                            検索
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <!-- 登録されたエントリーシート一覧 -->
                    <h2 class="text-xl font-bold mt-6">登録したエントリーシート</h2>

                    @if ($entrysheets->isEmpty())
                        <p class="text-gray-600 mt-4">登録されたエントリーシートがありません。</p>
                    @else
                        <div class="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            @foreach ($entrysheets as $entrysheet)
                                @if (!empty($entrysheet->company) && !empty($entrysheet->company->name))
                                    <div class="p-4 border rounded-[12px] cursor-pointer transition-transform duration-200 hover:scale-105" 
                                        onclick="location.href='{{ route('entrysheet.show', $entrysheet->id) }}'">
                                        <h3 class="text-lg font-semibold">{{ $entrysheet->title }}</h3>
                                        <p class="text-sm text-gray-600 mt-1">企業: {{ $entrysheet->company->name }}</p>
                                        <p class="text-sm text-gray-600">ステータス: {{ $entrysheet->status }}</p>

                                        @if (!empty($entrysheet->deadline))
                                            <p class="text-sm text-gray-600">締切: {{ $entrysheet->deadline }}</p>
                                        @endif
                                    </div>
                                @endif
                            @endforeach
                        </div>
@endif

                </div>
            </div>
        </div>
    </div>

    <script>
        // モーダル表示
        const filterButton = document.getElementById('filterButton');
        const filterModal = document.getElementById('filterModal');
        const closeModal = document.getElementById('closeModal');

        filterButton.addEventListener('click', () => {
            filterModal.classList.remove('hidden');
            filterModal.classList.add('block');
        });

        closeModal.addEventListener('click', () => {
            filterModal.classList.add('hidden');
            filterModal.classList.remove('block');
        });
    </script>
</x-app-layout>
