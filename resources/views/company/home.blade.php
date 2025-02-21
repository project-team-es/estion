<x-app-layout>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden sm:rounded-[12px]">
                <div class="p-6 text-gray-900">

                    <!-- ボタンを横並びにするコンテナ -->
                    <div class="flex justify-between items-center mb-4">
                        <!-- 企業登録ボタン（左端） -->
                        <a href="{{ route('company.create') }}" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-[12px]">
                            企業を登録
                        </a>

                        <!-- フィルターボタン（右端） -->
                        <button id="filterButton" 
                            class="text-gray-500 font-bold py-2 px-4 rounded-full transition
                                hover:bg-gray-300 hover:text-white">
                            {!! config('icons.search') !!}
                        </button>
                    </div>

                    <!-- モーダル -->
                    <div id="filter-modal" class="hidden fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                        <div class="bg-white rounded-[12px] w-full max-w-lg p-6">
                            <button id="close-modal" class="absolute top-2 right-2 text-gray-600 hover:text-gray-800">&times;</button>
                            
                            <h2 class="text-xl font-bold mb-4">フィルター設定</h2>
                            
                            <!-- フィルターフォーム -->
                            <form method="GET" action="{{ route('company.search') }}" class="flex flex-col items-center space-y-4">
                                <!-- 企業名検索 -->
                                <input type="text" name="search" placeholder="企業名で検索" 
                                       class="border border-gray-300 rounded-[12px] px-4 py-2 mb-2 w-full" 
                                       value="{{ request('search') }}">

                                <!-- 業界絞り込み（チェックボックス） -->
                                <div class="flex flex-col mb-4 w-full">
                                    @foreach($industries as $industry)
                                        <label class="mb-2">
                                            <input type="checkbox" name="industry_ids[]" value="{{ $industry->id }}"
                                                   @if(in_array($industry->id, request('industry_ids', []))) checked @endif>
                                            {{ $industry->name }}
                                        </label>
                                    @endforeach
                                </div>

                                <!-- 絞り込みボタン -->
                                <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 ml-2 rounded-[12px] w-full">
                                    絞り込み
                                </button>
                            </form>

                            <!-- モーダルを閉じるボタン -->
                            <button id="close-modal-btn" class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 mt-4 rounded-[12px] w-full">
                                閉じる
                            </button>
                        </div>
                    </div>

                    <!-- ログインユーザーが登録した企業一覧 -->
                    <h2 class="text-xl font-bold mt-6">登録した企業</h2>

                    @if ($companies->isEmpty())
                        <p class="text-gray-600 mt-4">登録された企業がありません。</p>
                    @else
                        <div class="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            @foreach ($companies as $company)
                                <div class="p-4 border rounded-[12px] cursor-pointer hover:bg-gray-100" 
                                    onclick="location.href='{{ route('company.show', $company->id) }}'">
                                    <h3 class="text-lg font-semibold">{{ $company->name }}</h3>
                                    <p class="text-sm text-gray-600">{{ $company->industry->name ?? '業界なし' }}</p>
                                    <p class="text-sm text-gray-600 mt-1">{{ $company->status ?? 'ステータスなし' }}</p>
                                </div>
                            @endforeach
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>

    <!-- JavaScriptでモーダルの表示/非表示 -->
    <script>
        // フィルターボタンをクリックしてモーダルを表示
        document.getElementById('filter-toggle').addEventListener('click', function() {
            document.getElementById('filter-modal').classList.remove('hidden');
        });

        // モーダルを閉じるボタン
        document.getElementById('close-modal').addEventListener('click', function() {
            document.getElementById('filter-modal').classList.add('hidden');
        });

        // 閉じるボタン（モーダル内）
        document.getElementById('close-modal-btn').addEventListener('click', function() {
            document.getElementById('filter-modal').classList.add('hidden');
        });
    </script>
</x-app-layout>
