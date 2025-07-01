import React from 'react';
import AuthInput from '@/Pages/Auth/components/AuthInput';
import AuthButton from '@/Pages/Auth/components/AuthButton';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login() {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <Head title="ログイン" />
      <a href="/" className="absolute left-8 top-6 text-4xl font-bold text-black">
        estion.
      </a>

      <div className="mt-6 w-full max-w-lg rounded-[12px] border bg-white px-8 py-8">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">ログイン</h2>
        {/*
                <div className="flex justify-center mb-6">
                    <a href={route("auth.google")} className="hover:scale-110 transition">
                        <img src="/image/auth/google_icon.png" alt="Google ログイン" width="40" height="40" />
                    </a>
                </div>
                */}

        <form onSubmit={handleSubmit}>
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

          <div className="mt-6 space-y-3">
            <AuthButton text="ログイン" disabled={processing} />

            <div className="flex justify-center pt-1">
              <Link
                href={route('password.request')}
                className="text-center text-sm font-bold text-[#252525] transition hover:text-gray-900"
              >
                パスワードを忘れた方はこちら
              </Link>
            </div>

            <div className="my-3 border-t border-[#909090] opacity-50"></div>

            <div className="flex justify-center pt-6">
              <Link
                href={route('register')}
                className="text-center text-sm font-bold text-[#252525] transition hover:text-gray-900"
              >
                アカウントをお持ちでない方はこちら
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
