<x-app-layout>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden rounded-[12px] border">
                <div class="p-8 text-gray-900">
                    <!-- ヘッダー -->
                    <div class="flex items-center justify-between w-full">
                        <h2 class="text-2xl font-bold">自己分析</h2>
                    </div>
                    <p class="mt-2 text-gray-600">以下の質問に対して、あなたの回答を入力してください。</p>

                    <!-- 自己分析一括更新フォーム -->
                    <form id="bulkUpdateForm" method="POST" action="{{ route('analysis.bulkUpdate', Auth::id()) }}">
                        @csrf
                        @method('PATCH')
                        <!-- 削除された項目のIDを記録する hidden フィールド -->
                        <input type="hidden" name="deleted_ids" id="deleted_ids" value="">

                        @if($analyses->isEmpty())
                            <p class="text-gray-600 mt-4">まだ自己分析の質問が登録されていません。</p>
                        @endif

                        <!-- 自己分析リスト -->
                        <ul class="mt-4 space-y-4" id="contents-list">
                            @foreach($analyses as $analysis)
                                <li class="p-4 border rounded-[12px]" data-analysis-id="{{ $analysis->id }}">
                                    <!-- 質問と編集・削除アクション -->
                                    <div class="flex items-center justify-between mb-2">
                                        <div class="flex items-center space-x-2">
                                            <p class="font-bold">{{ $analysis->question }}</p>
                                            <a href="{{ route('analysis.edit', ['analysis' => $analysis->id]) }}"
                                                class="inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-200 transition-colors duration-200">
                                                    {!! config('icons.edit_mini') !!}
                                            </a>
                                        </div>
                                        <button type="button" onclick="copyAnswer('answer-{{ $analysis->id }}', this)" 
                                            class="text-gray-700 p-2 rounded-full hover:bg-gray-200 transition relative top-[5px]">
                                            {!! config('icons.copy') !!}
                                    </button>
                                    </div>
                                    <!-- 回答入力エリア -->
                                    <textarea name="answers[{{ $analysis->id }}]" 
                                                id="answer-{{ $analysis->id }}" 
                                                class="w-full border-gray-300 rounded-[12px] mt-2 p-2" 
                                                rows="1" 
                                                placeholder="回答を入力">{{ $analysis->answer }}</textarea>

                                    <div class="flex items-center justify-between mt-1">
                                        <p id="charCount-{{ $analysis->id }}" class="text-xs text-gray-600">
                                            現在の文字数: {{ strlen($analysis->answer) }}
                                        </p>

                                        @if (!empty($analysis->answer))
                                            <!-- 回答がある場合は通常のボタン -->
                                            <a href="{{ route('interview.expected.analysis', $analysis->id) }}"
                                            class="bg-green-300 hover:bg-green-400 text-gray-700 px-3 py-1 rounded-full text-sm">
                                                面接
                                            </a>
                                        @else
                                            <!-- 回答がない場合はクリック不可だが、見た目はそのまま -->
                                            <span class="bg-gray-300 text-gray-500 px-3 py-1 rounded-full text-sm cursor-pointer">
                                                面接
                                            </span>
                                        @endif
                                    </div>
                                </li>
                            @endforeach
                        </ul>

                        <!-- 新規質問追加ボタン -->
                        <div class="mt-4 flex justify-center">
                            <button type="button" id="add-content-btn" class="bg-transparent p-0 text-blue-500 hover:text-blue-700 transition-colors duration-200">
                                {!! config('icons.plus') !!}
                            </button>
                        </div>

                        <!-- 手動保存ボタン -->
                        <div class="mt-6 text-right">
                            <button type="submit" class="bg-green-500 text-white px-6 py-3 rounded-[12px] hover:bg-green-600">
                                保存
                            </button>
                        </div>
                    </form>
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
                <button type="button" onclick="removeNewContent(this)" class="m-1 text-gray-500 hover:text-red-500 w-8 h-8 flex items-center justify-center rounded-full text-sm">
                    {!! config('icons.trash') !!}
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
        // 修正: 'contents-list'
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
                deleteBtn.innerHTML = `{!! config('icons.trash') !!}`;
                deleteBtn.style.padding = '8px 12px';
                deleteBtn.style.border = 'none';
                deleteBtn.style.color = 'gray';
                deleteBtn.style.borderRadius = '12px';
                deleteBtn.style.cursor = 'pointer';
                deleteBtn.style.width = '100%';
                deleteBtn.style.transition = 'background-color 0.3s ease';
                deleteBtn.addEventListener('mouseover', function() {
                    deleteBtn.style.color = 'red';
                });
                deleteBtn.addEventListener('mouseout', function() {
                    deleteBtn.style.color = 'gray';
                });

                deleteBtn.addEventListener('click', function() {
                    alert("本当に削除してもよろしいですか?");
                    // li からコンテンツIDを取得（属性名を修正）
                    const contentId = li.getAttribute('data-analysis-id');
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