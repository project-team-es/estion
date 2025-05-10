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
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    プロフィール編集
                </h2>
            }
        >
            <Head title="プロフィール編集" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    <div className="bg-white shadow sm:rounded-lg">
                        <div className="p-4 sm:p-8">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">
                                プロフィール情報
                            </h2>
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>
                    </div>

                    <div className="bg-white shadow sm:rounded-lg">
                        <div className="p-4 sm:p-8">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">
                                パスワード更新
                            </h2>
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>
                    </div>

                    <div className="bg-white shadow sm:rounded-lg">
                        <div className="p-4 sm:p-8">
                            <h2 className="text-lg font-medium text-gray-900 mb-4 text-red-500">
                                アカウント削除
                            </h2>
                            <DeleteUserForm className="max-w-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}