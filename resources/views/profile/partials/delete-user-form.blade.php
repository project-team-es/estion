<section class="space-y-6 bg-white rounded-[12px] p-6">
    <header>
        <h2 class="text-lg font-medium text-gray-900">
            {{ __('アカウントの削除') }}
        </h2>

        <p class="mt-1 text-sm text-gray-600">
            {{ __('アカウントを削除すると、全てのデータが完全に削除されます。') }}
        </p>
    </header>

    <x-danger-button
        x-data=""
        x-on:click.prevent="$dispatch('open-modal', 'confirm-user-deletion')"
    >{{ __('アカウントを削除') }}</x-danger-button>

    <x-modal name="confirm-user-deletion" :show="$errors->userDeletion->isNotEmpty()" focusable>
        <form method="post" action="{{ route('profile.destroy') }}" class="p-6">
            @csrf
            @method('delete')

            <h2 class="text-lg font-medium text-gray-900">
                {{ __('本当にアカウントを削除しますか？') }}
            </h2>

            <p class="mt-1 text-sm text-gray-600">
                {{ __('アカウントを削除すると、すべてのデータが完全に削除されます。アカウントの削除を確定するため、パスワードを入力してください。') }}
            </p>

            <div class="mt-6">
                <x-input-label for="password" value="{{ __('パスワード') }}" class="sr-only" />

                <x-text-input
                    id="password"
                    name="password"
                    type="password"
                    class="mt-1 block w-3/4 border border-gray-300 rounded-[12px]"
                    placeholder="{{ __('Password') }}"
                />

                <x-input-error :messages="$errors->userDeletion->get('password')" class="mt-2" />
            </div>

            <div class="mt-6 flex justify-end">
                <x-secondary-button x-on:click="$dispatch('close')" class="rounded-[12px] border">
                    {{ __('キャンセル') }}
                </x-secondary-button>

                <x-danger-button class="ms-3 rounded-[12px] border">
                    {{ __('アカウントを削除') }}
                </x-danger-button>
            </div>
        </form>
    </x-modal>
</section>