import { Head, Link, useForm } from '@inertiajs/react';
import AuthInput from '@/Pages/Auth/components/AuthInput';
import AuthButton from '@/Pages/Auth/components/AuthButton';

const PAGE_META = {
  title: 'ログイン｜estion.',
  description:
    '新卒就活生向けES管理アプリ「estion.」のログイン画面です。ログインして、ESの進捗管理、企業情報、面接練習など、就活を効率化する機能をご利用ください。',
};

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
    <>
      <Head>
        <title>{PAGE_META.title}</title>
        <meta name="description" content={PAGE_META.description} />
        {/* <meta name="google-adsense-account" content="ca-pub-9604843985307640" /> */}
      </Head>

      <main className="flex min-h-screen flex-col items-center overflow-auto bg-gray-100 px-4 py-8 sm:justify-center">
        <Link
          href="/"
          className="absolute left-8 top-6 z-10 text-4xl font-bold text-black transition-opacity hover:opacity-80"
          aria-label="トップページへ戻る"
        >
          estion.
        </Link>

        <section className="mt-[30%] w-full max-w-[90%] rounded-xl border bg-white px-5 py-8 sm:mt-20 sm:px-8 md:mt-6 md:max-w-lg md:px-8 md:py-8">
          <h1 className="mb-4 text-center text-2xl font-bold text-gray-800">ログイン</h1>

          <div className="mb-6 flex justify-center">
            <a
              href={route('auth.google')}
              className="rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Googleアカウントでログイン"
            >
              <img src="/image/auth/google_icon.png" alt="" width="40" height="40" />
            </a>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <AuthInput
              id="email"
              label="メールアドレス"
              type="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              error={errors.email}
              required
            />

            <AuthInput
              id="password"
              label="パスワード"
              type="password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              error={errors.password}
              required
            />

            <div className="mt-7 space-y-3 md:mt-10">
              <AuthButton text="ログイン" disabled={processing} />

              <div className="flex justify-center py-1 md:py-2">
                <Link
                  href={route('password.request')}
                  className="text-center text-sm font-bold text-[#252525] transition hover:text-gray-900 focus:underline focus:outline-none"
                >
                  パスワードを忘れた方はこちら
                </Link>
              </div>

              <hr className="my-3 border-[#909090] opacity-50" />

              <div className="flex justify-center pt-4">
                <Link
                  href={route('register')}
                  className="text-center text-sm font-bold text-[#252525] transition hover:text-gray-900 focus:underline focus:outline-none"
                >
                  アカウントをお持ちでない方はこちら
                </Link>
              </div>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
