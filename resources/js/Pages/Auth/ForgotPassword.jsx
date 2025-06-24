import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <Head title="パスワード再設定" />
            <a href="/" className="absolute top-6 left-8 text-4xl font-bold text-black">
                estion.
            </a>

            <div className="w-full max-w-lg mt-6 px-8 py-8 bg-white border rounded-[12px]">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">パスワード再設定</h2>

                <div className="mb-4 text-sm text-gray-600 text-center">
                    ご登録のメールアドレスを入力してください。<br/>パスワード再設定用のリンクをお送りします。
                </div>

                {status && (
                    <div className="mb-4 text-sm font-medium text-blue-500 text-center">
                        {status}
                    </div>
                )}

                <form onSubmit={submit}>
                    <div className="mb-4">
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="メールアドレス"
                            error={!!errors.email}
                        />
                        <InputError message={errors.email} className="mt-2" />
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
                            パスワード再設定メールを送信
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}