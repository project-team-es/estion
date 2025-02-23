<x-app-layout>
    <div class="py-12">
        <div class="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center">{{ $entrysheet->company->name }}</h2>
            <div class="mt-6 p-4 border rounded-lg bg-gray-100">
                <h3 class="text-xl font-semibold">想定ES</h3>
                <p class="mt-2"><strong>質問:</strong> {{ $content->question }}</p>
                <p class="mt-2"><strong>回答:</strong> {{ $content->answer }}</p>
            </div>

            <!-- 面接リクエストフォーム -->
            <form method="POST" action="{{ route('interview.start') }}">
                @csrf
                <input type="hidden" name="entrysheet_id" value="{{ $entrysheet->id }}">
                <input type="hidden" name="content_id" value="{{ $content->id }}">

                <div class="mt-6">
                    <label for="interview_request" class="block text-lg font-semibold">面接リクエスト</label>
                    <textarea id="interview_request" name="interview_request" rows="1"
                              class="w-full border-gray-300 rounded-lg mt-2 p-2"
                              placeholder="例: キャリアプランと絡めて質問してほしい"></textarea>
                </div>

                <div class="mt-6 text-center">
                    <button type="submit"
                            class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
                        面接開始
                    </button>
                </div>
            </form>

            <div class="mt-4 text-center">
                <a href="{{ route('entrysheet.show', ['entrysheet' => $entrysheet->id]) }}" 
                class="flex items-center justify-center w-10 h-10 text-gray-500 rounded-full transition-colors duration-200 hover:bg-gray-200 hover:cursor-pointer">
                    {!! config('icons.undo') !!}
                </a>
            </div>

        </div>
    </div>
</x-app-layout>
