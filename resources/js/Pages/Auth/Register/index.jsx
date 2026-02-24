import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthInput from '@/Pages/Auth/components/AuthInput';
import AuthButton from '@/Pages/Auth/components/AuthButton';

const PAGE_META = {
  title: '新規登録｜estion.',
  description: '新卒就活生向けES管理アプリ「estion.」に新規登録して、就活の進捗管理を始めましょう。無料で簡単にアカウントを作成できます。',
};

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

  const handleInputChange = (field) => (e) => {
    setData(field, e.target.value);
  };

  return (
    <>
      <Head>
        <title>{PAGE_META.title}</title>
        <meta name="description" content={PAGE_META.description} />
      </Head>

      <div className="flex min-h-screen flex-col items-center overflow-auto bg-gray-100 px-4 py-12 sm:py-16 md:py-14">
        <a href="/" className="absolute left-8 top-6 z-10 text-4xl font-bold text-black">
          estion.
        </a>

        <div className="md:mt-13 mt-[25%] w-full max-w-[90%] rounded-[12px] border bg-white px-5 py-8 sm:mt-12 sm:max-w-[70%] md:max-w-lg">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">新規登録</h2>
          
          {/* Google OAuth */}
          <div className="mb-6 flex justify-center">
            <a href={route('auth.google')} className="transition hover:scale-110">
              <img src="/image/auth/google_sign_up.png" alt="Google ロゴ" width="150" height="50" />
            </a>
          </div>

          <form onSubmit={handleSubmit}>
            <AuthInput
              id="name"
              label="ユーザー名"
              type="text"
              value={data.name}
              onChange={handleInputChange('name')}
              error={errors.name}
            />

            <AuthInput
              id="email"
              label="メールアドレス"
              type="email"
              value={data.email}
              onChange={handleInputChange('email')}
              error={errors.email}
            />

            <AuthInput
              id="password"
              label="パスワード"
              type="password"
              value={data.password}
              onChange={handleInputChange('password')}
              error={errors.password}
            />

            <AuthInput
              id="password_confirmation"
              label="パスワード確認"
              type="password"
              value={data.password_confirmation}
              onChange={handleInputChange('password_confirmation')}
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
    </>
  );
}