import React, { useState, useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { useForm, Link, router, usePage } from '@inertiajs/react';
import { icons } from '@/Utils/icons';
export default function Edit({ content }) {
  const { errors } = usePage().props;
  const { data, setData, put, processing } = useForm({
    question: content.question,
    character_limit: content.character_limit || '',
  });

  const [charCount, setCharCount] = useState(content.answer ? content.answer.length : 0);

  const handleChange = (event) => {
    setData(event.target.name, event.target.value);
    if (event.target.name === 'answer') {
      setCharCount(event.target.value.length);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('content.update', { entrysheet: content.entry_sheet_id, content: content.id }));
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <AppLayout>
      <Head>
        <title>設問と文字数の編集</title>
        <meta
          name="description"
          content="estion.のES詳細編集ページです。登録したESの設問・文字数を編集することができます。"
        />
        <meta name="google-adsense-account" content="ca-pub-9604843985307640"/>
      </Head>
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[12px] border bg-white">
            <div className="relative p-8 text-gray-900">
              <h1 className="mb-6 text-2xl font-bold">質問内容と文字数を編集</h1>

              {/* 全体のエラーリスト表示を削除 */}

              {/* 編集フォーム */}
              <form onSubmit={handleSubmit}>
                {/* 質問 */}
                <div className="mb-4">
                  <label htmlFor="question" className="mb-2 block font-bold text-gray-700">
                    質問
                  </label>
                  <input
                    type="text"
                    name="question"
                    id="question"
                    value={data.question}
                    onChange={handleChange}
                    className={`w-full rounded-[12px] border-gray-300 px-6 py-3 focus:border-blue-500 focus:ring-blue-500 ${errors.question ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.question && (
                    <p className="mt-2 text-sm text-red-600">{errors.question}</p>
                  )}
                </div>

                {/* 文字数制限 */}
                <div className="mb-4">
                  <label htmlFor="character_limit" className="mb-2 block font-bold text-gray-700">
                    文字数制限 (任意)
                  </label>
                  <input
                    type="number"
                    name="character_limit"
                    id="character_limit"
                    value={data.character_limit}
                    onChange={handleChange}
                    className={`w-full rounded-[12px] border-gray-300 px-6 py-3 focus:border-blue-500 focus:ring-blue-500 ${errors.character_limit ? 'border-red-500' : ''}`}
                  />
                  {errors.character_limit && (
                    <p className="mt-2 text-sm text-red-600">{errors.character_limit}</p>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <button
                    onClick={handleGoBack}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-200 focus:outline-none"
                  >
                    <span dangerouslySetInnerHTML={{ __html: icons.undo }} className="h-5 w-5" />
                  </button>

                  <button
                    type="submit"
                    className="rounded-[12px] bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
