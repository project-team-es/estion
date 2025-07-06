import React from 'react';
import AuthInput from '@/Pages/Auth/components/AuthInput';
import AuthButton from '@/Pages/Auth/components/AuthButton';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('register'));
  };

  return (
    <div className="flex min-h-screen flex-col items-center overflow-auto bg-gray-100 px-4 py-12 sm:py-16 md:py-14">
      <a href="/" className="absolute left-8 top-6 z-10 text-4xl font-bold text-black">
        estion.
      </a>
      <Head title="新規登録" />
      <div className="md:mt-13 mt-[25%] w-full max-w-[90%] rounded-[12px] border bg-white px-5 py-8 sm:mt-12 sm:max-w-[70%] md:max-w-lg">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">新規登録</h2>
        {/* Google OAuth */}
        {/*
                <div className="flex justify-center mb-6">
                    <a href={route("auth.google")} className="hover:scale-110 transition">
                        <img src="/image/auth/google_sign_up.png" alt="Google ロゴ" width="150" height="50" />
                    </a>
                </div>
                */}
        <form onSubmit={handleSubmit}>
          <AuthInput
            id="name"
            label="ユーザー名"
            type="text"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            error={errors.name}
          />

          <AuthInput
            id="email"
            label="メールアドレス"
            type="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            error={errors.email}
          />

          <AuthInput
            id="password"
            label="パスワード"
            type="password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            error={errors.password}
          />

          <AuthInput
            id="password_confirmation"
            label="パスワード確認"
            type="password"
            value={data.password_confirmation}
            onChange={(e) => setData('password_confirmation', e.target.value)}
            error={errors.password_confirmation}
          />

          <div className="mt-6 space-y-3">
            <AuthButton text="登録" disabled={processing} />

            <div className="mt-5 border-t border-[#909090] opacity-50"></div>

            <div className="flex justify-center pt-5">
              <Link
                href={route('login')}
                className="text-center text-sm font-bold text-[#252525] transition hover:text-gray-900"
              >
                すでにアカウントをお持ちの方はこちら
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
