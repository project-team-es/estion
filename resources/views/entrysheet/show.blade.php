<x-app-layout>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden rounded-[12px] border">
                <div class="p-8 text-gray-900">

                    <div class="flex items-center justify-between w-full">
                        <div class="flex items-center space-x-4">
                            <h2 class="text-2xl font-bold">{{ $entrysheet->company->name }}</h2>
                            <p class="text-lg font-semibold"><strong>{{ $entrysheet->title }}</strong></p>
                            
                            <!-- PDFボタン -->
                            <a href="{{ route('entrysheet.pdf', $entrysheet->id) }}" 
                               class="bg-blue-600 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-500">
                                PDF
                            </a>
                        </div>
                        <a href="{{ route('entrysheet.edit', $entrysheet) }}" class="bg-blue-500 text-white px-4 py-2 rounded-[12px]">
                            編集
                        </a>
                    </div>

                    <p class="mt-4"><strong>ステータス:</strong> {{ $entrysheet->status }}</p>
                    <p class="mt-2"><strong>締切日:</strong> {{ $entrysheet->deadline ?? '未設定' }}</p>

                    <!-- 質問と回答の登録フォーム -->
                    <h3 class="text-xl font-bold mt-6">質問と回答を追加</h3>

                    <!-- エラーメッセージ -->
                    @if ($errors->any())
                        <div class="mb-4 p-4 bg-red-100 text-red-700 rounded-[12px]">
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    <form method="POST" action="{{ route('content.store', $entrysheet->id) }}">
                        @csrf

                        <!-- 質問 -->
                        <div class="mb-5">
                            <label for="question" class="block text-gray-700 font-bold mb-2">質問</label>
                            <input type="text" name="question" id="question" value="{{ old('question') }}" 
                                class="w-full border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500 px-4 py-2" required>
                        </div>

                        <!-- 文字数制限 -->
                        <div class="mb-5">
                            <label for="character_limit" class="block text-gray-700 font-bold mb-2">文字数制限</label>
                            <input type="number" name="character_limit" id="character_limit" value="{{ old('character_limit') }}"
                                class="w-full border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500 px-4 py-2">
                        </div>

                        <!-- 回答 -->
                        <div class="mb-5">
                            <label for="answer" class="block text-gray-700 font-bold mb-2">回答</label>
                            <textarea name="answer" id="answer" rows="4"
                                    class="w-full border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
                                    required>{{ old('answer') }}</textarea>
                            <p id="charCount" class="text-gray-600">現在の文字数: 0</p>
                            <!-- コピー機能ボタン -->
                            <button type="button" onclick="copyAnswer('answer', this)" 
                                class="mt-2 bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded-full text-sm">
                                コピー
                            </button>
                        </div>

                        <!-- 文字数カウント -->
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

                        <!-- 登録ボタン -->
                        <div class="text-right">
                            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-[12px] hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400">
                                追加
                            </button>
                        </div>
                    </form>

                    <!-- 登録済みの質問と回答 -->
                    <h3 class="text-xl font-bold mt-6">登録済みの質問と回答</h3>

                    @if ($entrysheet->contents->isEmpty())
                        <p class="text-gray-600 mt-4">まだ登録された質問がありません。</p>
                    @else
                        <ul class="mt-4 space-y-2">
                            @foreach ($entrysheet->contents as $content)
                                <li class="p-4 border rounded-[12px] flex items-start justify-between transition-transform duration-200 hover:scale-105 cursor-pointer relative"
                                    oncontextmenu="showContextMenu(event, '{{ route('content.edit', ['entrysheet' => $entrysheet->id, 'content' => $content->id]) }}', '{{ route('content.destroy', ['entrysheet' => $entrysheet->id, 'content' => $content->id]) }}')">
                                    <div class="w-full">
                                        <p class="font-bold">質問: {{ $content->question }}</p>
                                        <p class="mt-1">回答: <span id="answer-{{ $content->id }}">{{ $content->answer }}</span></p>
                                    </div>
                                </li>
                                <button type="button" onclick="copyAnswer('answer-{{ $content->id }}', this)" 
                                    class="mt-2 bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded-full text-sm">
                                    コピー
                                </button>
                            @endforeach
                        </ul>

                        <!-- コンテキストメニュー -->
                        <div id="contextMenu" class="hidden absolute bg-white border shadow-md rounded-[12px] p-2 z-50">
                            <button id="editButton" class="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-300 rounded-[12px]">
                                編集
                            </button>
                            <button id="deleteButton" class="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 rounded-[12px]">
                                削除
                            </button>
                        </div>

                    @endif

                    <!-- 戻るボタン -->
                    <a href="{{ route('entrysheet') }}" class="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-[12px]">
                        戻る
                    </a>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>

<script>
function copyAnswer(answerId, buttonElement) {
    let answerElement = document.getElementById(answerId);
    // `textarea` は `value` を使用、それ以外は `innerText`
    let textToCopy = answerElement.tagName === "TEXTAREA" ? answerElement.value : answerElement.innerText;
    navigator.clipboard.writeText(textToCopy).then(function() {
        buttonElement.innerText = "コピーされました";
        buttonElement.disabled = true;

        // 3秒後にボタンの状態を戻す
        setTimeout(function() {
            buttonElement.innerText = "コピー";
            buttonElement.disabled = false;
        }, 3000);
    }).catch(function(err) {
        alert("コピーに失敗しました: " + err);
    });
}

// 右クリックの処理
document.addEventListener("click", function () {
    document.getElementById("contextMenu").classList.add("hidden");
});

function showContextMenu(event, editUrl, deleteUrl) {
    event.preventDefault(); // 右クリックのデフォルトメニューを無効化

    let contextMenu = document.getElementById("contextMenu");
    let editButton = document.getElementById("editButton");
    let deleteButton = document.getElementById("deleteButton");

    // 編集ボタンのアクションを設定
    editButton.onclick = function () {
        location.href = editUrl;
    };

    // 削除ボタンのアクションを設定
    deleteButton.onclick = function () {
        if (confirm("本当に削除しますか？")) {
            fetch(deleteUrl, {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": "{{ csrf_token() }}",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ _method: "DELETE" })
            })
            .then(response => {
                if (response.ok) {
                    location.reload(); // 成功したらページリロード
                } else {
                    alert("削除に失敗しました");
                }
            });
        }
    };

    // 画面外に出ないようにメニュー位置調整
    let menuWidth = contextMenu.offsetWidth;
    let menuHeight = contextMenu.offsetHeight;
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    let posX = event.pageX;
    let posY = event.pageY;

    if (posX + menuWidth > windowWidth) {
        posX -= menuWidth;
    }
    if (posY + menuHeight > windowHeight) {
        posY -= menuHeight;
    }

    contextMenu.style.left = `${posX}px`;
    contextMenu.style.top = `${posY}px`;
    contextMenu.classList.remove("hidden");
}
</script>