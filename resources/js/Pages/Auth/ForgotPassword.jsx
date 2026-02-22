import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });

  const submit = (e) => {
    e.preventDefault();

    post(route('password.email'));
  };

  return (
    <>
      <Head>
        <title>パスワード再設定</title>
        <meta
          name="description"
          content="estion.のパスワード再設定画面です。ご登録のメールアドレスを入力して、パスワード再設定の手続きにお進みください。"
        />
        <meta name="google-adsense-account" content="ca-pub-9604843985307640" />
      </Head>

      <div className="flex min-h-screen flex-col items-center overflow-auto bg-gray-100 px-4 py-8 sm:justify-center">
        <a href="/" className="absolute left-8 top-6 z-10 text-4xl font-bold text-black">
          estion.
        </a>
        <div className="mt-[40%] w-full max-w-[90%] rounded-[12px] border bg-white px-5 py-8 sm:mt-[20%] sm:max-w-[70%] md:mt-10 md:max-w-lg md:px-8">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">パスワード再設定</h2>
          <div className="mb-4 text-center text-[12px] text-gray-600 sm:text-sm">
            ご登録のメールアドレスを入力してください。
            <br />
            パスワード再設定用のリンクをお送りします。
          </div>
          {status && (
            <div className="mb-4 text-center text-sm font-medium text-blue-500">
              {status}
              {status === 'パスワードリセット用メールを送信しました。' && (
                <>
                  <br />
                  メールの到着には一時間ほどかかる場合がございます。
                </>
              )}
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
                className={`w-full rounded-md py-2 font-bold text-white transition md:py-3 ${
                  processing ? 'cursor-not-allowed bg-gray-200' : 'bg-gray-400 hover:bg-blue-500'
                }`}
                disabled={processing}
              >
                パスワード再設定メールを送信
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
