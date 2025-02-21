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
                            <ul class="mt-4 space-y-4">
                                @foreach ($entrysheet->contents as $content)
                                    <li class="p-4 border rounded-[12px]">
                                        <p class="font-bold">質問: {{ $content->question }}</p>
                                        
                                        <!-- 回答入力欄 -->
                                        <textarea name="answers[{{ $content->id }}]" 
                                                  id="answer-{{ $content->id }}" 
                                                  class="w-full border-gray-300 rounded-[12px] mt-2 p-2" 
                                                  rows="3">{{ $content->answer }}</textarea>
                                        
                                        <!-- コピー機能 -->
                                        <div class="mt-2">
                                            <button type="button" 
                                                    onclick="copyAnswer('answer-{{ $content->id }}', this)" 
                                                    class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded-full text-sm">
                                                コピー
                                            </button>
                                        </div>
                                    </li>
                                @endforeach
                            </ul>

                            <!-- 保存ボタン（ページ下部） -->
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

<!-- コピー機能用スクリプト -->
<script>
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
</script>