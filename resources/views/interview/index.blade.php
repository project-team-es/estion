<x-app-layout>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden sm:rounded-[12px] shadow-lg">
                <div class="p-6 text-gray-900">
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
                                <!-- 質問終了メッセージ -->
                                <li id="endMessage" class="hidden p-4 bg-white rounded-[12px] shadow text-gray-700 text-center text-lg">
                                    質問は以上です
                                    <br>
                                    <button id="restartButton" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-[12px] hover:bg-blue-600 transition duration-300">
                                        はじめから
                                    </button>
                                </li>
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
            const endMessage = document.getElementById('endMessage');
            const restartButton = document.getElementById('restartButton');

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

                    // 次の質問を遅延表示 or すべての質問を表示
                    setTimeout(() => {
                        if (index + 1 < questions.length) {
                            questions[index + 1].classList.remove('hidden');
                            questions[index + 1].classList.add('fade-in');
                        } else {
                            // すべての質問を表示
                            questions.forEach(q => {
                                q.classList.remove('hidden');
                                q.classList.add('fade-in');
                            });

                            // 最後の質問の後に "質問は終了です" を表示
                            endMessage.classList.remove('hidden');
                            endMessage.classList.add('fade-in');
                        }
                    }, 500);
                });
            });

            // 「はじめから」ボタンの処理
            restartButton.addEventListener('click', function () {
                // すべての質問を非表示にする
                questions.forEach(question => {
                    question.classList.add('hidden');
                });

                // 最初の質問を表示
                questions[0].classList.remove('hidden');
                questions[0].classList.add('fade-in');

                // 終了メッセージを非表示にする
                endMessage.classList.add('hidden');
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