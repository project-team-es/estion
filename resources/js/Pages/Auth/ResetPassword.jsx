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
    <>
      <Head>
        <title>新しいパスワードを設定</title>

        <meta
          name="description"
          content="estion.のパスワードリセット画面です。新しいパスワードを入力して、パスワードの再設定を完了させてください。"
        />
        <meta name="google-adsense-account" content="ca-pub-9604843985307640" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9604843985307640"
          crossOrigin="anonymous"
        ></script>
      </Head>

      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <a href="/" className="absolute left-8 top-6 text-4xl font-bold text-black">
          estion.
        </a>

        <div className="mt-6 w-full max-w-lg rounded-[12px] border bg-white px-8 py-8">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
            パスワードをリセット
          </h2>

          <form onSubmit={submit}>
            <div className="mb-4">
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                メールアドレス
              </label>
              <TextInput
                id="email"
                type="email"
                name="email"
                value={data.email}
                className="mt-1 block w-full cursor-not-allowed rounded-[8px] border-gray-300 bg-gray-100 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" // 無効化された見た目を追加
                autoComplete="username"
                onChange={(e) => setData('email', e.target.value)}
                disabled
              />
              <InputError message={errors.email} className="mt-2" />
            </div>

            <div className="mb-4 mt-4">
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
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

            <div className="mb-4 mt-4">
              <label
                htmlFor="password_confirmation"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                新しいパスワード（確認）
              </label>
              <TextInput
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                value={data.password_confirmation}
                autoComplete="new-password"
                onChange={(e) => setData('password_confirmation', e.target.value)}
                placeholder="新しいパスワードをもう一度入力"
              />
              <InputError message={errors.password_confirmation} className="mt-2" />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className={`w-full rounded-md py-3 font-bold text-white transition ${
                  processing ? 'cursor-not-allowed bg-gray-200' : 'bg-gray-400 hover:bg-blue-500'
                }`}
                disabled={processing}
              >
                パスワードをリセット
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
