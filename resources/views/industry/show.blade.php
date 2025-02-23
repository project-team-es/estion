<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ $industry->name }} の詳細
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    <h1 class="text-2xl font-bold mb-6">{{ $industry->name }}</h1>
                    <p>登録者ID: {{ $industry->user_id }}</p>
                    <p>作成日: {{ $industry->created_at }}</p>
                    <p>更新日: {{ $industry->updated_at }}</p>

                    <!-- 企業一覧表示 -->
                    <h2 class="text-xl font-bold mt-6">この業界に属する企業</h2>
                    @if ($companies->isEmpty())
                        <p class="text-gray-600 mt-4">この業界に登録された企業はありません。</p>
                    @else
                        <div class="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            @foreach ($companies as $company)
                                <div class="p-4 border rounded-lg shadow cursor-pointer hover:bg-gray-100" 
                                     onclick="location.href='{{ route('company.show', $company->id) }}'">
                                    <h3 class="text-lg font-semibold">{{ $company->name }}</h3>
                                    <p class="text-sm text-gray-600">ステータス: {{ $company->status ?? '未設定' }}</p>
                                    <p class="text-sm text-gray-600">選考フロー: {{ $company->process ?? '未設定' }}</p>
                                </div>
                            @endforeach
                        </div>
                    @endif
                    <!-- 戻るボタン -->
                    <a href="{{ route('industry') }}" 
                    class="flex items-center justify-center w-10 h-10 text-gray-500 rounded-full transition-colors duration-200 hover:bg-gray-200 hover:cursor-pointer">
                        {!! config('icons.undo') !!}
                    </a>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>