<x-app-layout>
    <div class="py-12">
        <div class="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <div class="mt-6 p-4 border rounded-lg bg-gray-100">
                <h3 class="text-xl font-semibold">内容</h3>
                <p class="mt-2"><strong>設問:</strong> {{ $analysis->question }}</p>
                <p class="mt-2"><strong>回答:</strong> {{ $analysis->answer }}</p>
            </div>

            <!-- 面接リクエストフォーム -->
            <form method="POST" action="{{ route('interview.analysis') }}">
                @csrf
                <input type="hidden" name="analysis_id" value="{{ $analysis->id }}">

                <div class="mt-6">
                    <label for="interview_request" class="block text-lg font-semibold">面接リクエスト</label>
                    <textarea id="interview_request" name="interview_request" rows="1"
                              class="w-full border-gray-300 rounded-lg mt-2 p-2"
                              placeholder="例: 経験から得た学びについて深掘りしてください。"></textarea>
                </div>

                <div class="mt-6 text-center">
                    <button type="submit"
                            class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
                        面接開始
                    </button>
                </div>
            </form>

            <div class="mt-4 text-center">
                <a href="{{ route('analysis.index') }}" class="text-blue-500 hover:underline">戻る</a>
            </div>
        </div>
    </div>
</x-app-layout>
