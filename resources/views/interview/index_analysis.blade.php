<x-app-layout>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden sm:rounded-[12px] shadow-lg">
                <div class="p-6 text-gray-900">
                    <!-- 生成された質問一覧 -->
                    @if (!empty($questions))
                    <div class="mt-6">
                        <h2 class="text-xl font-bold text-gray-900 mb-4">生成された質問</h2>
                        <div class="bg-gray-50 border border-gray-300 rounded-[12px] p-6 shadow-lg">
                            <ul class="list-none text-gray-800 space-y-4">
                                @foreach($questions as $index => $question)
                                    <li class="question-item hidden p-4 bg-white rounded-[12px] shadow hover:bg-blue-50 transition duration-300">
                                        <div class="flex justify-between items-center">
                                            <p class="text-lg">{{ $question }}</p>
                                            <button class="next-question hidden px-4 py-2 bg-blue-500 text-white rounded-[12px] hover:bg-blue-600 transition duration-300">
                                                次の質問へ →
                                            </button>
                                        </div>
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
                    @endif

                    <!-- エントリーシートに戻るボタン -->
                    <div class="mt-6 text-left">
                        <a href="{{ route('analysis.index', $analysis->id) }}" 
                        class="px-6 py-3 bg-gray-500 text-white font-semibold rounded-[12px] hover:bg-gray-600 transition duration-300 inline-block ml-6 sm:ml-6">
                            終了
                        </a>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const questions = document.querySelectorAll('.question-item');
            const nextButtons = document.querySelectorAll('.next-question');
            const endMessage = document.getElementById('endMessage');
            const restartButton = document.getElementById('restartButton');

            let currentIndex = 0;

            // 最初の質問だけを表示
            if (questions.length > 0) {
                questions[0].classList.remove('hidden');
                questions[0].classList.add('fade-in');
                nextButtons[0].classList.remove('hidden');
            }

            // 質問を進める処理
            function goToNextQuestion() {
                if (currentIndex < questions.length - 1) {
                    // 現在の質問をフェードアウトして非表示
                    questions[currentIndex].classList.add('fade-out');
                    nextButtons[currentIndex].classList.add('hidden'); // 現在のボタンを非表示

                    setTimeout(() => {
                        questions[currentIndex].classList.add('hidden');
                        questions[currentIndex].classList.remove('fade-out');

                        // 次の質問をフェードインして表示
                        currentIndex++;
                        questions[currentIndex].classList.remove('hidden');
                        questions[currentIndex].classList.add('fade-in');
                        nextButtons[currentIndex].classList.remove('hidden'); // 次のボタンを表示
                    }, 500);
                } else {
                    // すべての質問を表示し、「質問は終了です」を表示
                    questions.forEach(q => {
                        q.classList.remove('hidden');
                        q.classList.add('fade-in');
                    });

                    // すべての「次の質問へ」ボタンを非表示にする
                    nextButtons.forEach(button => button.classList.add('hidden'));

                    endMessage.classList.remove('hidden');
                    endMessage.classList.add('fade-in');
                }
            }

            // クリックで次の質問に進む
            questions.forEach((item, index) => {
                item.addEventListener('click', goToNextQuestion);
            });

            // 「次の質問へ」ボタンで次の質問に進む
            nextButtons.forEach(button => {
                button.addEventListener('click', function (event) {
                    event.stopPropagation(); // クリックイベントが親の `li` に伝播しないようにする
                    goToNextQuestion();
                });
            });

            // Enterキーで次の質問に進む
            document.addEventListener('keydown', function (event) {
                if (event.key === "Enter") {
                    goToNextQuestion();
                }
            });

            // 「はじめから」ボタンの処理
            restartButton.addEventListener('click', function () {
                // すべての質問を非表示にする
                questions.forEach(question => {
                    question.classList.add('hidden');
                });

                // 最初の質問を表示
                currentIndex = 0;
                questions[0].classList.remove('hidden');
                questions[0].classList.add('fade-in');
                nextButtons[0].classList.remove('hidden');

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