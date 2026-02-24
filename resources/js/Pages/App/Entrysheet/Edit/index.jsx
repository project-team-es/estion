import React, { useRef } from 'react';
import { AppLayout } from '@/Layouts/AppLayout';
import { Head, useForm, Link, router } from '@inertiajs/react';
import { icons } from '@/Utils/icons';

export default function Edit({ entrysheet, presetTitles, companies, errors }) {
  const { data, setData, put, processing } = useForm({
    title: entrysheet.title,
    status: entrysheet.status,
    deadline: entrysheet.deadline ? entrysheet.deadline.substring(0, 10) : '',
    company_id: entrysheet.company_id,
  });
  const dateInputRef = useRef(null);
  const handleDeadlineInputClick = () => {
    if (dateInputRef.current) {
      try {
        dateInputRef.current.showPicker();
      } catch (error) {
        console.error('カレンダーの表示に失敗しました:', error);
      }
    }
  };

  const handleChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('entrysheet.update', entrysheet.id));
  };

  const handleDelete = () => {
    if (confirm('このエントリーシートの内容が全て削除されます！\n本当によろしいですか？')) {
      router.delete(route('entrysheet.destroy', entrysheet.id));
    }
  };

  return (
    <AppLayout>
      <Head>
        <title>ESを編集｜estion.</title>
        <meta
          name="description"
          content="estion.のES編集ページです。登録したエントリーシートの締切を修正することができます。"
        />
        <meta name="google-adsense-account" content="ca-pub-9604843985307640" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9604843985307640"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[12px] border bg-white">
            <div className="px-8 py-6 text-gray-900">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">エントリーシートを編集</h2>
                <button
                  onClick={handleDelete}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:bg-red-200 focus:outline-none"
                >
                  <span dangerouslySetInnerHTML={{ __html: icons.trash }} />
                </button>
              </div>

              {Object.keys(errors).length > 0 && (
                <div className="mb-4 rounded-[12px] bg-red-100 p-4 text-red-700">
                  <ul>
                    {Object.values(errors).map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-5 mt-6">
                  <label htmlFor="title" className="mb-2 block font-bold text-gray-700">
                    タイトル
                  </label>
                  <select
                    name="title"
                    id="title"
                    value={data.title}
                    onChange={handleChange}
                    className="w-full rounded-[12px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">タイトルを選択</option>
                    {presetTitles.map((title) => (
                      <option key={title} value={title}>
                        {title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-5">
                  <label htmlFor="status" className="mb-2 block font-bold text-gray-700">
                    ステータス
                  </label>
                  <select
                    name="status"
                    id="status"
                    value={data.status}
                    onChange={handleChange}
                    className="w-full rounded-[12px] border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="下書き">下書き</option>
                    <option value="提出済み">提出済み</option>
                    <option value="書類通過">書類通過</option>
                    <option value="書類落ち">書類落ち</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="deadline" className="mb-2 block font-bold text-gray-700">
                    締切日
                  </label>
                  <div className="relative flex items-center rounded-[12px]">
                    <input
                      ref={dateInputRef}
                      type="date"
                      name="deadline"
                      id="deadline"
                      value={data.deadline}
                      onChange={handleChange}
                      onClick={handleDeadlineInputClick}
                      className="w-full cursor-pointer appearance-none rounded-[12px] border-gray-300 py-2 pl-4 pr-4"
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label htmlFor="company_id" className="mb-2 block font-bold text-gray-700">
                    企業
                  </label>
                  <select
                    name="company_id"
                    id="company_id"
                    value={data.company_id}
                    onChange={handleChange}
                    className="w-full rounded-[12px] border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                  >
                    {companies.map((company) => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  {' '}
                  {/* justify-between を追加 */}
                  <Link
                    href={route('entrysheet.show', entrysheet.id)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-200 focus:outline-none"
                    dangerouslySetInnerHTML={{ __html: icons.undo }}
                  />
                  <button
                    type="submit"
                    className="rounded-[12px] bg-blue-600 px-6 py-2 text-white hover:bg-blue-500"
                    disabled={processing}
                  >
                    更新
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
