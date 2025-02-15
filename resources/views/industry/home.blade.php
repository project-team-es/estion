<x-app-layout>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                <div class="flex flex-wrap items-center justify-center px-6">
                    <div class="text-gray-900">
                        {{ __("業界分類ページ") }}
                    </div>

                    <!-- 業界登録ボタン -->
                    <div class="flex flex-wrap px-6">
                        <a href="{{ route('industry.create') }}" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow">
                            業界を登録
                        </a>
                    </div>
                </div>

                <!-- 業界リスト -->
                <div class="wrapper">
                    <div class="flex flex-wrap justify-center">
                        @forelse ($industries as $industry)
                            <div class="p-6 text-gray-700">
                                <div class="card cursor-pointer" onclick="location.href='{{ route('industry.show', $industry->id) }}'">
                                    <div class="card-info">
                                        <h2 class="card-title">{{ $industry->name }}</h2>
                                    </div>
                                </div>
                            </div>
                        @empty
                            <p class="text-gray-500 text-center">登録された業界はありません。</p>
                        @endforelse
                    </div>
                </div>

            </div>
        </div>
    </div>
</x-app-layout>