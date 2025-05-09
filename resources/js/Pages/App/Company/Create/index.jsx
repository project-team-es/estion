import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { useForm, Head } from "@inertiajs/react";

const CreateCompany = ({ industries }) => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        industry_id: '',
        homepage: '',
        mypage: '',
        loginid: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('company.store'));
    };

    return (
        <AppLayout title="企業登録">
            <Head title="企業登録" />
            <div className="max-w-4xl mx-auto py-12 px-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">企業登録</h2>

                <form onSubmit={handleSubmit} className="bg-white rounded-[12px] p-6 border">

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">企業名</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full border-gray-300 rounded-[12px] px-4 py-2"
                            required
                        />
                        {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">業界</label>
                        <select
                            value={data.industry_id}
                            onChange={(e) => setData('industry_id', e.target.value)}
                            className="w-full border-gray-300 rounded-[12px] px-4 py-2"
                            required
                        >
                            <option value="">業界を選択してください</option>
                            {industries.map((industry) => (
                                <option key={industry.id} value={industry.id}>
                                    {industry.name}
                                </option>
                            ))}
                        </select>
                        {errors.industry_id && <div className="text-red-500 text-sm">{errors.industry_id}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">ホームページURL（任意）</label>
                        <input
                            type="text"
                            value={data.homepage}
                            onChange={(e) => setData('homepage', e.target.value)}
                            className="w-full border-gray-300 rounded-[12px] px-4 py-2"
                        />
                        {errors.homepage && <div className="text-red-500 text-sm">{errors.homepage}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">マイページURL（任意）</label>
                        <input
                            type="text"
                            value={data.mypage}
                            onChange={(e) => setData('mypage', e.target.value)}
                            className="w-full border-gray-300 rounded-[12px] px-4 py-2"
                        />
                        {errors.mypage && <div className="text-red-500 text-sm">{errors.mypage}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">ログインID（任意）</label>
                        <input
                            type="text"
                            value={data.loginid}
                            onChange={(e) => setData('loginid', e.target.value)}
                            className="w-full border-gray-300 rounded-[12px] px-4 py-2"
                        />
                        {errors.loginid && <div className="text-red-500 text-sm">{errors.loginid}</div>}
                    </div>

                    <div className="text-right">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-6 py-3 rounded-[12px] hover:bg-blue-500"
                        >
                            登録
                        </button>
                    </div>

                </form>
            </div>
        </AppLayout>
    );
};

export default CreateCompany;