import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <Head title="パスワードをリセット" />
            <a href="/" className="absolute top-6 left-8 text-4xl font-bold text-black">
                estion.
            </a>

            <div className="w-full max-w-lg mt-6 px-8 py-8 bg-white border rounded-[12px]">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">パスワードをリセット</h2>

                <form onSubmit={submit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block font-medium text-sm text-gray-700 mb-1">
                            メールアドレス
                        </label>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full bg-gray-100 cursor-not-allowed rounded-[8px] border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" // 無効化された見た目を追加
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            disabled
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4 mb-4">
                        <label htmlFor="password" className="block font-medium text-sm text-gray-700 mb-1">
                            新しいパスワード
                        </label>
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            autoComplete="new-password"
                            isFocused={true}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="新しいパスワード"
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-4 mb-4">
                        <label
                            htmlFor="password_confirmation"
                            className="block font-medium text-sm text-gray-700 mb-1"
                        >
                            新しいパスワード（確認）
                        </label>
                        <TextInput
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            placeholder="新しいパスワードをもう一度入力"
                        />
                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className={`w-full py-3 rounded-md font-bold text-white transition ${
                                processing
                                    ? 'bg-gray-200 cursor-not-allowed'
                                    : 'bg-gray-400 hover:bg-blue-500'
                            }`}
                            disabled={processing}
                        >
                            パスワードをリセット
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}