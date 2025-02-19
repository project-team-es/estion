<x-app-layout>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden sm:rounded-[12px] shadow-lg">
                <div class="p-6 text-gray-900">
                    <!-- 入力フォーム -->
                    <div class="bg-gray-50 rounded-[12px] p-6 shadow-inner">
                        <form action="{{ route('interview.execute') }}" method="post" class="w-full">
                            @csrf
                            <label for="toGeminiText" class="block text-gray-600 font-semibold mb-2">エントリーシートを入力してください:</label>
                            <textarea 
                                name="toGeminiText" 
                                id="toGeminiText" 
                                class="w-full h-28 p-4 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                                placeholder="ここに入力..."
                                autofocus>@isset($toGeminiCommand){{ $toGeminiCommand }}@endisset</textarea>

                            <button 
                                type="submit" 
                                class="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-[12px] transition duration-300 shadow-md hover:shadow-lg">
                                質問を生成
                            </button>
                        </form>
                    </div>

                    <!-- 生成された質問一覧 -->
                    @isset($result)
                    <div class="mt-6">
                        <h2 class="text-xl font-bold text-gray-900 mb-4">生成された質問</h2>
                        <div class="bg-gray-50 border border-gray-300 rounded-[12px] p-6 shadow-lg">
                            @php
                                $questions = json_decode($result, true);
                            @endphp
                            <ul class="list-none text-gray-800 space-y-4">
                                @foreach($questions as $index => $question)
                                    <li class="question-item hidden cursor-pointer p-4 bg-white rounded-[12px] shadow hover:bg-blue-50 transition duration-300">
                                        <p class="text-lg">{!! $question !!}</p>
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                    </div>
                    @endisset
                </div>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const questions = document.querySelectorAll('.question-item');
            let currentIndex = 0;

            // 最初の質問だけを表示
            if (questions.length > 0) {
                questions[0].classList.remove('hidden');
                questions[0].classList.add('fade-in');
            }

            // 各質問にクリックイベントを追加
            questions.forEach((item, index) => {
                item.addEventListener('click', function () {
                    // フェードアウトアニメーション
                    item.classList.add('fade-out');

                    // アニメーション後に要素を非表示にする
                    setTimeout(() => {
                        item.classList.add('hidden');
                        item.classList.remove('fade-out');
                    }, 500);

                    // 次の質問を遅延表示
                    setTimeout(() => {
                        if (index + 1 < questions.length) {
                            questions[index + 1].classList.remove('hidden');
                            questions[index + 1].classList.add('fade-in');
                        }
                    }, 500); // フェードアウト後に次の質問を表示
                });
            });
        });
    </script>

    <style>
        /* フェードイン・フェードアウトアニメーション */
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeIn 0.6s ease-out forwards;
        }

        .fade-out {
            opacity: 1;
            transform: translateY(0);
            animation: fadeOut 0.5s ease-out forwards;
        }

        @keyframes fadeIn {
            0% {
                opacity: 0;
                transform: translateY(20px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes fadeOut {
            0% {
                opacity: 1;
                transform: translateY(0);
            }
            100% {
                opacity: 0;
                transform: translateY(-10px);
            }
        }
    </style>
</x-app-layout>
