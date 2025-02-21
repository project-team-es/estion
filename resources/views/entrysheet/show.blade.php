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

                    <!-- 登録済みの質問と回答 一括更新フォーム -->
                    <h3 class="text-xl font-bold mt-6">登録済みの質問と回答</h3>

                    @if ($entrysheet->contents->isEmpty())
                        <p class="text-gray-600 mt-4">まだ登録された質問がありません。</p>
                    @else
                        <form method="POST" action="{{ route('content.bulkUpdate', $entrysheet->id) }}">
                            @csrf
                            @method('PATCH')
                            <ul class="mt-4 space-y-4" id="contents-list">
                                <!-- コンテンツ表示 -->
                                @foreach ($entrysheet->contents as $content)
                                    <li class="p-4 border rounded-[12px]">
                                        <p class="font-bold">質問: {{ $content->question }}</p>
                                        
                                        <!-- 回答入力欄 -->
                                        <textarea name="answers[{{ $content->id }}]" 
                                                  id="answer-{{ $content->id }}" 
                                                  class="w-full border-gray-300 rounded-[12px] mt-2 p-2" 
                                                  rows="3">{{ $content->answer }}</textarea>
                                        
                                        <!-- コピー機能＆面接ボタン -->
                                        <div class="mt-2">
                                            <button type="button" 
                                                    onclick="copyAnswer('answer-{{ $content->id }}', this)" 
                                                    class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded-full text-sm">
                                                コピー
                                            </button>
                                            <button type="button" 
                                                    onclick="location.href='{{ route('interview.index', ['entrysheet' => $entrysheet->id, 'content' => $content->id]) }}'" 
                                                    class="bg-green-300 hover:bg-green-400 text-gray-700 px-3 py-1 rounded-full text-sm">
                                                面接
                                            </button>
                                            </form>
                                        </div>
                                    </li>
                                @endforeach
                            </ul>
                            
                            <!-- 新規設問追加ボタン（中央寄せ） -->
                            <div class="mt-4 flex justify-center">
                                <button type="button" id="add-content-btn" class="bg-blue-500 text-white px-4 py-2 rounded-full">
                                    +
                                </button>
                            </div>
                            
                            <!-- 保存ボタン -->
                            <div class="mt-6 text-right">
                                <button type="submit" 
                                        class="bg-green-500 text-white px-6 py-3 rounded-[12px] hover:bg-green-600">
                                    保存
                                </button>
                            </div>
                        </form>
                    @endif

                    <!-- 戻るボタン -->
                    <a href="{{ route('entrysheet') }}" class="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded-[12px]">
                        戻る
                    </a>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>


<!-- コピー機能および自動保存・localStorage連携用スクリプト -->
<script>
    // コピー機能
    function copyAnswer(answerId, buttonElement) {
        let answerElement = document.getElementById(answerId);
        let textToCopy = answerElement.value;
        navigator.clipboard.writeText(textToCopy).then(function() {
            buttonElement.innerText = "コピーされました";
            buttonElement.disabled = true;
            setTimeout(function() {
                buttonElement.innerText = "コピー";
                buttonElement.disabled = false;
            }, 3000);
        }).catch(function(err) {
            alert("コピーに失敗しました: " + err);
        });
    }

    // 前回保存されたデータを保持するグローバル変数
    let previousData = {};

    // すべての入力値（既存の回答と新規設問）を収集する関数
    function gatherData() {
        let data = {};

        // 既存の回答：textarea の name 属性が "answers[...]" のもの
        let answers = {};
        document.querySelectorAll("textarea[name^='answers']").forEach(function(textarea) {
            answers[textarea.getAttribute("name")] = textarea.value;
        });
        data.answers = answers;

        // 新規設問の質問：input[name="new_questions[]"]
        let newQuestions = [];
        document.querySelectorAll("input[name='new_questions[]']").forEach(function(input) {
            newQuestions.push(input.value);
        });
        data.new_questions = newQuestions;

        // 新規設問の回答：textarea[name="new_answers[]"]
        let newAnswers = [];
        document.querySelectorAll("textarea[name='new_answers[]']").forEach(function(textarea) {
            newAnswers.push(textarea.value);
        });
        data.new_answers = newAnswers;

        return data;
    }

    // 収集したデータに変更があったかを比較する関数
    function isDataChanged(newData) {
        return JSON.stringify(newData) !== JSON.stringify(previousData);
    }

    // 自動保存処理
    function autoSave() {
        let newData = gatherData();
        
        // 変更がなければ送信しない
        if (!isDataChanged(newData)) {
            console.log("変更が検知されなかったため、自動保存はスキップされました。");
            return;
        }
        
        // 変更があった場合、前回の状態を更新
        previousData = newData;
        
        // FormData の作成
        let formData = new FormData();
        formData.append('_token', '{{ csrf_token() }}'); // CSRF トークン
        formData.append('_method', 'PATCH'); // PATCH メソッドとして送信
        
        // 既存の回答を FormData に追加
        for (const key in newData.answers) {
            formData.append(key, newData.answers[key]);
        }
        
        // 新規設問の質問を FormData に追加
        newData.new_questions.forEach(function(question) {
            formData.append('new_questions[]', question);
        });
        
        // 新規設問の回答を FormData に追加
        newData.new_answers.forEach(function(answer) {
            formData.append('new_answers[]', answer);
        });
        
        // バルク更新用エンドポイントに fetch API でリクエストを送信
        fetch("{{ route('content.bulkUpdate', $entrysheet->id) }}", {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('サーバーエラー: ' + response.status);
            }
            console.log('自動保存に成功しました');
            // 自動保存に成功したら localStorage をクリア
            localStorage.removeItem('entrysheetData');
        })
        .catch(error => {
            console.error('自動保存でエラーが発生しました:', error);
        });
    }

    // ページ離脱時にも自動保存（beforeunload イベント）
    window.addEventListener("beforeunload", function(event) {
        let data = gatherData();
        let params = new URLSearchParams();
        params.append('_token', '{{ csrf_token() }}');
        params.append('_method', 'PATCH');
        
        // 既存の回答
        for (const key in data.answers) {
            params.append(key, data.answers[key]);
        }
        // 新規設問の質問と回答
        data.new_questions.forEach(function(question) {
            params.append('new_questions[]', question);
        });
        data.new_answers.forEach(function(answer) {
            params.append('new_answers[]', answer);
        });
        
        let url = "{{ route('content.bulkUpdate', $entrysheet->id) }}";
        navigator.sendBeacon(url, params);
    });

    // 60秒ごとに自動保存を実行
    setInterval(autoSave, 60000);

    // 新規設問追加処理
    function addNewContent() {
        // 新しい <li> 要素を作成
        let li = document.createElement('li');
        li.className = 'p-4 border rounded-[12px]';
        li.innerHTML = `
            <div>
                <label class="font-bold">質問:</label>
                <input type="text" name="new_questions[]" class="w-full border-gray-300 rounded-[12px] mt-2 p-2" placeholder="質問を入力">
            </div>
            <div class="mt-2">
                <label class="font-bold">回答:</label>
                <textarea name="new_answers[]" class="w-full border-gray-300 rounded-[12px] mt-2 p-2" rows="3" placeholder="回答を入力"></textarea>
            </div>
            <div class="mt-2 text-right">
                <button type="button" onclick="removeNewContent(this)" class="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                    削除
                </button>
            </div>
        `;
        // <ul id="contents-list"> に追加
        document.getElementById('contents-list').appendChild(li);
    }

    function removeNewContent(button) {
        // 削除ボタンがクリックされた親の <li> を削除
        let li = button.closest('li');
        li.remove();
    }

    // 「+」ボタンにイベントリスナーを追加
    document.getElementById('add-content-btn').addEventListener('click', addNewContent);

    // 入力内容の変更を localStorage に保存する（input イベント）
    document.addEventListener('input', function() {
        const data = gatherData();
        localStorage.setItem('entrysheetData', JSON.stringify(data));
    });

    // ページロード時に localStorage の内容を復元する
    document.addEventListener('DOMContentLoaded', function() {
        const savedData = localStorage.getItem('entrysheetData');
        if (savedData) {
            const data = JSON.parse(savedData);
            
            // 既存の回答を復元
            for (const key in data.answers) {
                let textarea = document.querySelector(`textarea[name="${key}"]`);
                if (textarea) {
                    textarea.value = data.answers[key];
                }
            }
            
            // 新規設問を復元（既に新規設問が存在している場合はクリアして再生成）
            if (data.new_questions && data.new_questions.length > 0) {
                // 既存の新規設問を一度全削除
                document.querySelectorAll("input[name='new_questions[]']").forEach(function(input) {
                    input.closest('li').remove();
                });
                // 新規設問を再生成
                for (let i = 0; i < data.new_questions.length; i++) {
                    let li = document.createElement('li');
                    li.className = 'p-4 border rounded-[12px]';
                    li.innerHTML = `
                        <div>
                            <label class="font-bold">質問:</label>
                            <input type="text" name="new_questions[]" class="w-full border-gray-300 rounded-[12px] mt-2 p-2" placeholder="質問を入力" value="${data.new_questions[i]}">
                        </div>
                        <div class="mt-2">
                            <label class="font-bold">回答:</label>
                            <textarea name="new_answers[]" class="w-full border-gray-300 rounded-[12px] mt-2 p-2" rows="3" placeholder="回答を入力">${data.new_answers[i]}</textarea>
                        </div>
                        <div class="mt-2 text-right">
                            <button type="button" onclick="removeNewContent(this)" class="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                                削除
                            </button>
                        </div>
                    `;
                    document.getElementById('contents-list').appendChild(li);
                }
            }
        }
    });
</script>