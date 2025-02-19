<x-app-layout>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden sm:rounded-[12px]">
                <div class="p-6 text-gray-900">
                    <!-- 入力フォーム -->
                    <div class="bg-gray-50 rounded-[12px] p-6">
                        <form action="{{ route('interview.execute') }}" method="post" class="w-full">
                            @csrf
                            <label for="toGeminiText" class="block text-gray-600 font-semibold mb-2">エントリーシートを入力してください:</label>
                            <textarea 
                                name="toGeminiText" 
                                id="toGeminiText" 
                                class="w-full h-24 p-3 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="ここに入力..."
                                autofocus>@isset($toGeminiCommand){{ $toGeminiCommand }}@endisset</textarea>

                            <button 
                                type="submit" 
                                class="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-[12px] transition duration-300">
                                質問を生成
                            </button>
                        </form>
                    </div>

                    <!-- 生成された質問一覧 -->
                    @isset($result)
                    <div class="mt-6">
                        <h2 class="text-xl font-bold text-gray-900 mb-4">生成された質問</h2>
                        <div class="bg-gray-50 border border-gray-300 rounded-[12px] p-6">
                            @php
                                $questions = json_decode($result, true);
                            @endphp
                            <ul class="list-disc list-inside text-gray-800 space-y-2">
                                @foreach($questions as $question)
                                    <li>{!! $question !!}</li>
                                @endforeach
                            </ul>
                        </div>
                    </div>
                    @endisset

                </div>
            </div>
        </div>
    </div>
</x-app-layout>