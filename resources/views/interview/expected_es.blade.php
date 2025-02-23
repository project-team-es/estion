<x-app-layout>
    <div class="py-12">
        <div class="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center">{{ $entrysheet->company->name }}</h2>
            <div class="mt-6 p-4 border rounded-lg bg-gray-100">
                <h3 class="text-xl font-semibold">想定ES</h3>
                <p class="mt-2"><strong>質問:</strong> {{ $content->question }}</p>
                <p class="mt-2"><strong>回答:</strong> {{ $content->answer }}</p>
            </div>

            <div class="mt-6 text-center">
                <a href="{{ route('interview.start', ['entrysheet' => $entrysheet->id, 'content' => $content->id]) }}"
                   class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
                    面接開始
                </a>
            </div>

            <div class="mt-4 text-center">
                <a href="{{ route('entrysheet.show', ['entrysheet' => $entrysheet->id]) }}" class="text-blue-500 hover:underline">戻る</a>
            </div>
        </div>
    </div>
</x-app-layout>
