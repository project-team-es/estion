<x-app-layout>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden rounded-[12px] border">
                <div class="p-8 text-gray-900">
                    <!-- ヘッダー -->
                    <div class="flex items-center justify-between w-full">
                        <div class="flex items-center space-x-4">
                            <h2 class="text-2xl font-bold">{{ $entrysheet->company->name }}</h2>
                            <p class="text-lg font-semibold"><strong>{{ $entrysheet->title }}</strong></p>
                            
                            <!-- PDFボタン -->
                            <a href="{{ route('entrysheet.pdf', $entrysheet->id) }}" 
                               target="_blank" rel="noopener noreferrer"
                               class="bg-blue-600 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-500">
                                PDF
                            </a>
                        </div>
                        
                        <a href="{{ route('entrysheet.edit', $entrysheet) }}"
                            class="inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-200 transition-colors duration-200 hover:cursor-pointer">
                                {!! config('icons.edit') !!}
                        </a>
                    </div>

                    <p class="mt-4"><strong>ステータス:</strong> {{ $entrysheet->status }}</p>
                    <p class="mt-2"><strong>締切日:</strong> {{ $entrysheet->deadline ?? '未設定' }}</p>

                    <!-- 登録済みの質問と回答 一括更新フォーム -->
                    <form id="bulkUpdateForm" method="POST" action="{{ route('content.bulkUpdate', $entrysheet->id) }}">
                        @csrf
                        @method('PATCH')
                        <!-- 削除されたコンテンツIDを記録する隠しフィールド -->
                        <input type="hidden" name="deleted_ids" id="deleted_ids" value="">

                        @if ($entrysheet->contents->isEmpty())
                            <p class="text-gray-600 mt-4">まだ登録された質問がありません。</p>
                        @endif

                        <!-- 既存コンテンツリスト（空の場合は空のリストになる） -->
                        <ul class="mt-4 space-y-4" id="contents-list">
                        @foreach ($entrysheet->contents as $content)
                            <li class="p-4 border rounded-[12px]" 
                                data-content-id="{{ $content->id }}" 
                                data-edit-url="{{ route('content.edit', ['entrysheet' => $entrysheet->id, 'content' => $content->id]) }}">
                                <!-- コンテンツ表示部分 -->
                                <div class="flex items-center justify-between mb-2">
                                    <div class="flex items-center">
                                        <p class="font-bold">{{ $content->question }}</p>
                                        <a href="{{ route('content.edit', ['entrysheet' => $entrysheet->id, 'content' => $content->id]) }}"
                                           class="inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-200 transition-colors duration-200 hover:cursor-pointer">
                                            {!! config('icons.edit_mini') !!}
                                        </a>
                                    </div>

                                    <button type="button" onclick="copyAnswer('answer-{{ $content->id }}', this)" 
                                        class="text-gray-700 p-2 rounded-full hover:bg-gray-200 transition relative top-[5px]">
                                        {!! config('icons.copy') !!}
                                    </button>
                                </div>
                                <textarea name="answers[{{ $content->id }}]" 
                                        id="answer-{{ $content->id }}" 
                                        class="w-full border-gray-300 rounded-[12px] mt-2 p-2" 
                                        rows="1">{{ $content->answer }}</textarea>
                                <div class="flex items-center justify-between mt-1">
                                    <p id="charCount-{{ $content->id }}" class="text-xs text-gray-600">
                                        現在の文字数: {{ strlen($content->answer) }}
                                    </p>
                                    <button type="button" 
                                            onclick="location.href='{{ route('interview.index', ['entrysheet' => $entrysheet->id, 'content' => $content->id]) }}'" 
                                            class="bg-green-300 hover:bg-green-400 text-gray-700 px-3 py-1 rounded-full text-sm">
                                        面接
                                    </button>
                                </div>
                            </li>
                        @endforeach
                        </ul>

                        <!-- 新規設問追加ボタン（常に表示） -->
                        <div class="mt-4 flex justify-center">
                            <button type="button" id="add-content-btn" class="bg-transparent p-0 text-blue-500 hover:text-blue-700 transition-colors duration-200">
                                {!! config('icons.puls') !!}
                            </button>
                        </div>
                                                
                        <!-- 手動保存ボタン -->
                        <div class="mt-6 text-right">
                            <button type="submit" 
                                    class="bg-green-500 text-white px-6 py-3 rounded-[12px] hover:bg-green-600">
                                保存
                            </button>
                        </div>
                    </form>
                    <!-- 戻るボタン -->
                    <a href="{{ route('entrysheet') }}" class="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded-[12px]">
                        戻る
                    </a>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>

<!-- コピー機能・新規設問追加のスクリプト -->
<script>
    // テキストエリア自動リサイズ関数
    function autoResizeTextArea(textarea) {
        textarea.style.height = 'auto'; // 高さリセット
        textarea.style.height = textarea.scrollHeight + 'px'; // 内容に合わせて高さ設定
    }

    // 文字数更新関数
    function updateCharCount(textarea, displayElem) {
        displayElem.innerText = "現在の文字数: " + textarea.value.length;
    }

    // 既存のテキストエリアのイベントリスナー設定
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll("textarea[id^='answer-']").forEach(function(textarea) {
            let idParts = textarea.getAttribute("id").split('-');
            let display = document.getElementById("charCount-" + idParts[1]);
            if (display) {
                updateCharCount(textarea, display);
            }
            textarea.addEventListener('input', function() {
                autoResizeTextArea(textarea);
                if (display) {
                    updateCharCount(textarea, display);
                }
            });
            // 初期サイズ調整
            autoResizeTextArea(textarea);
        });
    });

    // --- 新規設問の処理 ---
    let newContentCounter = 0;
    function addNewContent() {
        newContentCounter++; 
        let li = document.createElement('li');
        li.className = 'p-4 border rounded-[12px] new-content';
        li.innerHTML = `
            <div class="flex justify-between items-center">
                <label class="font-bold">質問:</label>
                <button type="button" onclick="removeNewContent(this)" class="m-1 bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm">
                    -
                </button>
            </div>
            <input type="text" name="new_questions[]" class="w-full border-gray-300 rounded-[12px] mt-2 p-2" placeholder="質問を入力">
            <div class="mt-2">
                <div class="flex justify-between items-center">
                    <label class="font-bold">回答:</label>
                    <button type="button" onclick="copyAnswer('new-answer-${newContentCounter}', this)" 
                        class="text-gray-700 p-2 rounded-full hover:bg-gray-200 transition relative top-[5px]">
                        {!! config('icons.copy') !!}
                    </button>
                </div>
                <div class="flex items-center">
                    <textarea id="new-answer-${newContentCounter}" name="new_answers[]" class="w-full border-gray-300 rounded-[12px] mt-2 p-2" rows="1" placeholder="回答を入力"></textarea>
                </div>
                <!-- 文字数表示用 -->
                <p class="text-xs text-gray-600 mt-1" id="charCount-new-${newContentCounter}">現在の文字数: 0</p>
            </div>
        `;
        document.getElementById('contents-list').appendChild(li);

        // テキストエリアと文字数カウント用の要素を取得
        let textarea = li.querySelector(`textarea`);
        let displayElem = li.querySelector(`#charCount-new-${newContentCounter}`);

        // 初期化処理
        updateCharCount(textarea, displayElem);
        autoResizeTextArea(textarea);

        // イベントリスナーを追加
        textarea.addEventListener('input', function() {
            autoResizeTextArea(this);
            updateCharCount(this, displayElem);
        });
    }

    function removeNewContent(button) {
        let li = button.closest('li');
        li.remove();
    }
    document.getElementById('add-content-btn').addEventListener('click', addNewContent);

    // テキストエリア自動リサイズ関数
    function autoResizeTextArea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }
    // 既存のテキストエリアのイベントリスナー設定
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll("textarea[id^='answer-']").forEach(function(textarea) {
            // 既存コンテンツは id が "answer-{contentId}" なので、charCount-{contentId} を取得
            let idParts = textarea.getAttribute("id").split('-');
            let display = document.getElementById("charCount-" + idParts[1]);
            if (display) {
                updateCharCount(textarea, display);
            }
            textarea.addEventListener('input', function() {
                autoResizeTextArea(textarea);
                if (display) {
                    updateCharCount(textarea, display);
                }
            });
            // 初期リサイズ
            autoResizeTextArea(textarea);
        });
    });

   /*
    *  右クリック時の削除機能
    */
    document.addEventListener('DOMContentLoaded', function() {
        const contentList = document.getElementById('contents-list');

        contentList.addEventListener('contextmenu', function(e) {
            const li = e.target.closest('li');
            if (li) {
                e.preventDefault();

                // 既存のカスタムメニューがあれば削除
                const existingMenu = document.querySelector('.custom-context-menu');
                if (existingMenu) {
                    existingMenu.remove();
                }

                // カスタムメニューのコンテナを作成
                const menuDiv = document.createElement('div');
                menuDiv.className = 'custom-context-menu';
                menuDiv.style.position = 'absolute';
                menuDiv.style.top = e.pageY + 'px';
                menuDiv.style.left = e.pageX + 'px';
                menuDiv.style.zIndex = 1000;
                menuDiv.style.backgroundColor = '#fff';
                menuDiv.style.border = '1px solid #ccc';
                menuDiv.style.borderRadius = '12px';
                menuDiv.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                menuDiv.style.padding = '8px';
                // 列表示にするためにflexDirectionをcolumnに設定
                menuDiv.style.display = 'flex';
                menuDiv.style.flexDirection = 'column';
                menuDiv.style.gap = '8px';

                // 削除ボタンの作成
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = '削除';
                deleteBtn.style.padding = '8px 12px';
                deleteBtn.style.border = 'none';
                deleteBtn.style.backgroundColor = '#e3342f';
                deleteBtn.style.color = '#fff';
                deleteBtn.style.borderRadius = '12px';
                deleteBtn.style.cursor = 'pointer';
                deleteBtn.style.width = '100%';
                deleteBtn.style.transition = 'background-color 0.3s ease';
                deleteBtn.addEventListener('mouseover', function() {
                    deleteBtn.style.backgroundColor = '#cc1f1a';
                });
                deleteBtn.addEventListener('mouseout', function() {
                    deleteBtn.style.backgroundColor = '#e3342f';
                });
                deleteBtn.addEventListener('click', function() {
                    // li からコンテンツIDを取得し、隠しフィールドに追記
                    const contentId = li.getAttribute('data-content-id');
                    if (contentId) {
                        const hiddenInput = document.getElementById('deleted_ids');
                        if (hiddenInput.value) {
                            hiddenInput.value += ',' + contentId;
                        } else {
                            hiddenInput.value = contentId;
                        }
                    }
                    li.remove();
                    menuDiv.remove();
                });

                // 削除ボタンのみをメニューに追加
                menuDiv.appendChild(deleteBtn);
                document.body.appendChild(menuDiv);
            }
        });

        // 他の場所をクリックした場合、表示中のカスタムメニューを非表示にする
        document.addEventListener('click', function(e) {
            const menuDiv = document.querySelector('.custom-context-menu');
            if (menuDiv && !menuDiv.contains(e.target)) {
                menuDiv.remove();
            }
        });
    });
</script>