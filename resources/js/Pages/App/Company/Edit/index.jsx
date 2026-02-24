import React from 'react';
import { AppLayout } from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ company, industries }) {
  const { data, setData, put, processing, errors } = useForm({
    name: company.name,
    industry_id: company.industry_id,
    homepage: company.homepage || '',
    mypage: company.mypage || '',
    loginid: company.loginid || '',
    status: company.status || '',
    process: company.process || '',
  });

  const handleChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('company.update', company.id));
  };

  return (
    <AppLayout>
      <Head>
        <title>企業情報編集｜estion.</title>
        <meta
          name="description"
          content="estion.の企業情報編集ページです。登録した企業の情報を編集することができます。"
        />
        <meta name="google-adsense-account" content="ca-pub-9604843985307640" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9604843985307640"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">企業情報編集</h2>

        {Object.keys(errors).length > 0 && (
          <div className="mb-4 rounded-[12px] bg-red-100 p-4 text-red-700">
            <ul>
              {Object.values(errors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="rounded-[12px] border bg-white p-6">
          <form onSubmit={handleSubmit}>
            {/* 企業名 */}
            <div className="mb-4">
              <label htmlFor="name" className="mb-2 block font-bold text-gray-700">
                企業名
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={data.name}
                onChange={handleChange}
                className="w-full rounded-[12px] border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            {/* 業界 */}
            <div className="mb-4">
              <label htmlFor="industry_id" className="mb-2 block font-bold text-gray-700">
                業界
              </label>
              <select
                name="industry_id"
                id="industry_id"
                value={data.industry_id}
                onChange={handleChange}
                className="w-full rounded-[12px] border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
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
              <label htmlFor="homepage" className="mb-2 block font-bold text-gray-700">
                ホームページURL (任意)
              </label>
              <input
                type="url"
                name="homepage"
                id="homepage"
                value={data.homepage}
                onChange={handleChange}
                className="w-full rounded-[12px] border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* マイページ */}
            <div className="mb-4">
              <label htmlFor="mypage" className="mb-2 block font-bold text-gray-700">
                マイページURL (任意)
              </label>
              <input
                type="url"
                name="mypage"
                id="mypage"
                value={data.mypage}
                onChange={handleChange}
                className="w-full rounded-[12px] border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* ログインID */}
            <div className="mb-4">
              <label htmlFor="loginid" className="mb-2 block font-bold text-gray-700">
                ログインID (任意)
              </label>
              <input
                type="text"
                name="loginid"
                id="loginid"
                value={data.loginid}
                onChange={handleChange}
                className="w-full rounded-[12px] border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="rounded-[12px] bg-blue-600 px-6 py-3 text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
