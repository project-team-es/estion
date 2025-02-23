<x-app-layout>
    <div class="max-w-7xl mx-auto py-12 px-6">
        <!-- 企業情報セクション -->
        <div class="bg-white rounded-[12px] p-6 border">
            <div class="flex justify-between items-center">
                <!-- 企業名 -->
                <h2 class="text-2xl font-bold">{{ $company->name }}</h2>

                <!-- 企業情報エリア -->
                <div class="flex items-center space-x-4">
                    <!-- 企業HP -->
                    <a href="{{ $company->homepage }}" target="_blank" 
                       class="px-3 py-1 text-sm text-blue-500 font-semibold rounded-full border transition-transform duration-200 hover:scale-105">
                        企業HP
                    </a>

                    <!-- MyPage -->
                    @if ($company->mypage)
                        <a href="{{ $company->mypage }}" target="_blank" 
                           class="px-3 py-1 text-sm text-blue-500 font-semibold rounded-full border transition-transform duration-200 hover:scale-105">
                            MyPage
                        </a>
                    @endif

                    <!-- loginid (クリックでコピー) -->
                    <div class="relative flex flex-col items-center cursor-pointer" onclick="copyToClipboard('{{ $company->loginid }}')">
                        <!-- コピーしましたメッセージ -->
                        <span id="copyMessage" class="absolute -top-6 bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded opacity-0 transition-opacity duration-300">
                            コピーしました
                        </span>
                        <!-- ID表示 -->
                        <span id="loginid" class="px-3 py-1 text-sm text-gray-900 font-semibold rounded-full border transition-transform duration-200 hover:scale-105">
                            ID: {{ $company->loginid ?? '-----' }}
                        </span>
                    </div>

                    <!-- status（hoverでフローを表示） -->
                    <div class="relative flex flex-col items-center">
                        <!-- ステータス（hover時にフロー表示） -->
                        <span id="status" class="px-3 py-1 text-sm text-gray-900 font-semibold rounded-full border cursor-pointer"
                              onmouseover="showFlow()" onmouseout="hideFlow()">
                            {{ $company->status ?? '-----' }}
                        </span>

                        <!-- フローメッセージ（デフォルト非表示） -->
                        <div id="statusFlow" class="absolute top-8 bg-gray-800 text-white text-xs font-semibold px-3 py-2 rounded-lg opacity-0 transition-opacity duration-300 w-40 text-center">
                            <p>{{ $company->process ?? '-----' }}</p>
                        </div>
                    </div>

                    <!-- 業界 -->
                    <span class="px-3 py-1 text-sm text-gray-900 font-semibold rounded-full border">
                        {{ $company->industry->name ?? '-----' }}
                    </span>

                    <!-- 編集ボタン（業界の右側に配置） -->
                    <a href="{{ route('company.edit', $company->id) }}"
                       class="inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-200 transition-colors duration-200 hover:cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" style="opacity: 0.5;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil">
                            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>
                            <path d="m15 5 4 4"/>
                        </svg>
                    </a>
                    <!-- 削除ボタン（アイコンのみ） -->
                    <form action="{{ route('company.destroy', $company->id) }}" method="POST" onsubmit="return confirm('本当に削除しますか？');" class="inline-block">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="p-2 rounded-full text-gray-500 hover:text-red-500 transition-colors duration-200">
                            {!! config('icons.trash') !!}
                        </button>
                    </form>

                </div>
            </div>

            <!-- エントリーシート一覧 -->
            <div class="mt-6">
            <h3 class="flex items-center text-xl font-bold space-x-2">
                <span>エントリーシート一覧</span>
                <a href="{{ route('entrysheet.create.with.company', ['company_id' => $company->id]) }}"
                    class="bg-blue-500 inline-flex items-center justify-center p-2 rounded-[12px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-plus-2">
                        <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/>
                        <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                        <path d="M3 15h6"/>
                        <path d="M6 12v6"/>
                    </svg>
                </a>
            </h3>
                
                @if ($company->entrysheets->isEmpty())
                    <p class="text-gray-600 mt-4">この企業のエントリーシートは登録されていません。</p>
                @else
                    <div class="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        @foreach ($company->entrysheets as $entrysheet)
                            <div class="p-4 bg-white border rounded-[12px] hover:bg-gray-100 cursor-pointer"
                                onclick="location.href='{{ route('entrysheet.show', $entrysheet->id) }}'">
                                <h3 class="text-lg font-semibold">{{ $entrysheet->title }}</h3>
                                <p class="text-sm text-gray-600">締切: {{ $entrysheet->deadline ?? '未設定' }}</p>
                            </div>
                        @endforeach
                    </div>
                @endif
            </div>

            <div class="mt-12">
            <h3 class="flex items-center text-xl font-bold">
                <span>その他のファイル</span>
                <form action="{{ route('company.files.store', $company->id) }}" method="post" enctype="multipart/form-data" class="ml-4">
                    @csrf
                    <input type="file" name="file" class="hidden" id="fileInput" onchange="this.form.submit()">
                    <label for="fileInput" class="bg-blue-500 inline-flex items-center justify-center p-2 rounded-[12px] transition-transform duration-200 hover:scale-105 hover:bg-blue-600 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-upload">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="17 8 12 3 7 8"/>
                            <line x1="12" x2="12" y1="3" y2="15"/>
                        </svg>
                    </label>
                </form>
            </h3>
                
                @if ($company->files->isEmpty())
                    <p class="text-gray-600 mt-4">この企業に関連するその他のファイルは登録されていません。</p>
                @else
                    <!-- その他のファイル (PDF, Word, Excelなど) -->
                    <div class="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        @foreach ($company->files->filter(function($file) {
                            // 画像以外のファイルをフィルタ
                            return !in_array(strtolower(pathinfo($file->filename, PATHINFO_EXTENSION)), ['jpg', 'jpeg', 'png', 'gif']);
                        }) as $file)
                            <div class="p-4 bg-white border rounded-[12px] hover:bg-gray-100 transition-shadow duration-300 shadow-sm hover:shadow-md">
                                <h4 class="text-lg font-semibold truncate">{{ $file->filename }}</h4>

                                <!-- ダウンロードリンク -->
                                <a href="{{ route('company.files.download', $file->id) }}" 
                                class="block text-blue-500 hover:underline text-sm mt-2">
                                    ダウンロード
                                </a>

                                <!-- 削除 -->
                                <form action="{{ route('company.files.destroy', $file->id) }}" method="post" 
                                    onsubmit="return confirm('本当に削除しますか？');" class="mt-2">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="text-red-500 hover:underline text-sm">
                                        削除
                                    </button>
                                </form>
                            </div>
                        @endforeach
                    </div>

                    <!-- 画像ファイル (JPG, JPEG, PNG, GIF) -->
                    <h3 class="text-xl font-bold mt-8">画像ファイル</h3>
                    <div class="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        @foreach ($company->files->filter(function($file) {
                            // 画像ファイルをフィルタ
                            return in_array(strtolower(pathinfo($file->filename, PATHINFO_EXTENSION)), ['jpg', 'jpeg', 'png', 'gif']);
                        }) as $file)
                            <div class="p-4 bg-white border rounded-[12px] hover:bg-gray-100 transition-shadow duration-300 shadow-sm hover:shadow-md">
                                <!-- 画像表示-->
                                <a href="{{ asset('storage/' . $file->path) }}" target="_blank">
                                    <img src="{{ asset('storage/' . $file->path) }}" alt="{{ $file->filename }}" 
                                        class="w-full h-48 object-cover rounded-lg mb-2 cursor-pointer">
                                </a>

                                <!-- ダウンロードリンク -->
                                <a href="{{ route('company.files.download', $file->id) }}" 
                                class="block text-blue-500 hover:underline text-sm mt-2">
                                    ダウンロード
                                </a>

                                <!-- 削除 -->
                                <form action="{{ route('company.files.destroy', $file->id) }}" method="post" 
                                    onsubmit="return confirm('本当に削除しますか？');" class="mt-2">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="text-red-500 hover:underline text-sm">
                                        削除
                                    </button>
                                </form>
                            </div>
                        @endforeach
                    </div>
                @endif
            </div>

        </div>
    </div>

    <!-- クリップボードにコピーするスクリプト -->
    <script>
        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                const copyMessage = document.getElementById("copyMessage");
                copyMessage.classList.remove("opacity-0");
                setTimeout(() => {
                    copyMessage.classList.add("opacity-0");
                }, 1000);
            }).catch(err => {
                console.error('コピーに失敗しました', err);
            });
        }

        function showFlow() {
            document.getElementById("statusFlow").classList.remove("opacity-0");
        }

        function hideFlow() {
            document.getElementById("statusFlow").classList.add("opacity-0");
        }
    </script>
</x-app-layout>
