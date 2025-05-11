import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { useForm } from "@inertiajs/react";


export default function Edit({ company, industries }) {
    const { data, setData, put, processing, errors } = useForm({
        name: company.name,
        industry_id: company.industry_id,
        homepage: company.homepage || "",
        mypage: company.mypage || "",
        loginid: company.loginid || "",
        status: company.status || "",
        process: company.process || "",
    });

    const handleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("company.update", company.id));
    };

    return (
        <AppLayout title="企業情報編集">
            <div className="max-w-4xl mx-auto py-12 px-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">企業情報編集</h2>

                {Object.keys(errors).length > 0 && (
                    <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-[12px]">
                        <ul>
                            {Object.values(errors).map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="bg-white rounded-[12px] p-6 border">
                    <form onSubmit={handleSubmit}>
                        {/* 企業名 */}
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">企業名</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={data.name}
                                onChange={handleChange}
                                className="w-full border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
                                required
                            />
                        </div>

                        {/* 業界 */}
                        <div className="mb-4">
                            <label htmlFor="industry_id" className="block text-gray-700 font-bold mb-2">業界</label>
                            <select
                                name="industry_id"
                                id="industry_id"
                                value={data.industry_id}
                                onChange={handleChange}
                                className="w-full border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
                            >
                                {industries.map((industry) => (
                                    <option key={industry.id} value={industry.id}>
                                        {industry.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* ホームページ */}
                        <div className="mb-4">
                            <label htmlFor="homepage" className="block text-gray-700 font-bold mb-2">
                                ホームページURL (任意)
                            </label>
                            <input
                                type="url"
                                name="homepage"
                                id="homepage"
                                value={data.homepage}
                                onChange={handleChange}
                                className="w-full border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
                            />
                        </div>

                        {/* マイページ */}
                        <div className="mb-4">
                            <label htmlFor="mypage" className="block text-gray-700 font-bold mb-2">
                                マイページURL (任意)
                            </label>
                            <input
                                type="url"
                                name="mypage"
                                id="mypage"
                                value={data.mypage}
                                onChange={handleChange}
                                className="w-full border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
                            />
                        </div>

                        {/* ログインID */}
                        <div className="mb-4">
                            <label htmlFor="loginid" className="block text-gray-700 font-bold mb-2">
                                ログインID (任意)
                            </label>
                            <input
                                type="text"
                                name="loginid"
                                id="loginid"
                                value={data.loginid}
                                onChange={handleChange}
                                className="w-full border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
                            />
                        </div>


                        <div className="text-right">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-3 rounded-[12px] hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                disabled={processing}
                            >
                                更新
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}