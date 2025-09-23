import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
  return (
    <AppLayout>
      <Head>
        <title>プロフィール確認</title>
        <meta name="description" content="プロフィールを確認・修正することができます。" />
        <meta name="google-adsense-account" content="ca-pub-9604843985307640" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9604843985307640"
          crossorigin="anonymous"
        ></script>
      </Head>

      <div className="py-10">
        <div className="mx-auto max-w-7xl space-y-8 sm:px-6 lg:px-8">
          <div className="rounded-[12px] bg-white shadow-md">
            <div className="p-4 sm:p-8">
              <h2 className="mb-4 text-lg font-bold">プロフィール情報</h2>
              <UpdateProfileInformationForm
                mustVerifyEmail={mustVerifyEmail}
                status={status}
                className="max-w-xl"
              />
            </div>
          </div>

          <div className="rounded-[12px] bg-white shadow-md">
            <div className="p-4 sm:p-8">
              <h2 className="mb-4 text-lg font-bold">パスワード更新</h2>
              <UpdatePasswordForm className="max-w-xl" />
            </div>
          </div>

          <div className="rounded-[12px] bg-white shadow-md">
            <div className="p-4 sm:p-8">
              <h2 className="mb-4 text-lg font-bold text-red-500">アカウント削除</h2>
              <DeleteUserForm className="max-w-xl" />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
