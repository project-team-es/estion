import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
  return (
    <AppLayout
      title="プロフィール編集"
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">プロフィール編集</h2>
      }
    >
      <Head title="プロフィール編集" />

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
