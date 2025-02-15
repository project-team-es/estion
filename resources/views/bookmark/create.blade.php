<x-app-layout>
    <div class="py-12">
        <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden rounded-[12px] border">
                <div class="p-8 text-gray-900">
                    <h2 class="text-2xl font-bold mb-6">お気に入りURLを追加</h2>

                    <!-- エラーメッセージの表示 -->
                    @if ($errors->any())
                        <div class="mb-4 p-4 bg-red-100 text-red-700 rounded-[12px]">
                            <ul class="list-disc pl-5">
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    <!-- URL登録フォーム -->
                    <form method="POST" action="{{ route('bookmark.store') }}" class="space-y-4">
                        @csrf
                        <div>
                            <label for="name" class="block text-gray-700 font-bold">サイト名</label>
                            <input type="text" name="name" id="name" class="w-full border border-gray-300 rounded-[12px] p-3 focus:ring-blue-500 focus:border-blue-500" required>
                        </div>

                        <div>
                            <label for="url" class="block text-gray-700 font-bold">URL</label>
                            <input type="url" name="url" id="url" class="w-full border border-gray-300 rounded-[12px] p-3 focus:ring-blue-500 focus:border-blue-500" required>
                        </div>

                        <div class="flex justify-end space-x-4">
                            <a href="{{ url()->previous() }}" class="bg-gray-500 text-white px-6 py-3 rounded-[12px] hover:bg-gray-400">
                                戻る
                            </a>
                            <button type="submit" class="bg-blue-600 text-white px-6 py-3 rounded-[12px] hover:bg-blue-500">
                                追加
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- ブックマーク一覧 -->
            <div class="bg-white overflow-hidden rounded-[12px] border mt-8">
                <div class="p-8 text-gray-900">
                    <h2 class="text-2xl font-bold mb-6">ブックマーク</h2>

                    @if ($bookmarks->isEmpty())
                        <p class="text-gray-600 mt-4">登録されたブックマークがありません。</p>
                    @else
                        <ul class="space-y-4">
                            @foreach ($bookmarks as $bookmark)
                                <li class="flex justify-between items-center p-4 border rounded-[12px]">
                                    <a href="{{ $bookmark->url }}" target="_blank" class="text-blue-500 hover:underline">
                                        {{ $bookmark->name }}
                                    </a>
                                    <form method="POST" action="{{ route('bookmark.delete', $bookmark->id) }}" onsubmit="return confirm('このブックマークを削除しますか？');">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="text-red-500 hover:text-red-700">
                                            削除
                                        </button>
                                    </form>
                                </li>
                            @endforeach
                        </ul>
                    @endif

                    <!-- お気に入りbookmark作成ボタン -->
                    <div class="mt-6 text-right">
                        <a href="{{ route('bookmark.create') }}" 
                            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-[12px]">
                            ブックマークを追加
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>