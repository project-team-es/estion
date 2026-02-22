import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import BookmarkIndex from './BookmarkIndex';

export default function BookmarkCreate({ bookmarks }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    url: '',
  });

  const handleChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('bookmark.store'), {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <AppLayout>
      <Head>
        <title>ブックマーク登録</title>
        <meta
          name="description"
          content="estion.のブックマーク登録ページです。頻繁に利用するサイトURLを登録・削除することができます。"
        />
        <meta name="google-adsense-account" content="ca-pub-9604843985307640" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9604843985307640"
          crossOrigin="anonymous"
        ></script>
      </Head>
      {/* 追加フォームを囲む div で幅を調整 */}
      <div className="pt-10">
        <div className="mx-auto mb-8 max-w-3xl overflow-hidden rounded-[12px] border bg-white p-8">
          <h2 className="mb-6 text-2xl font-bold">お気に入りURLを追加</h2>
          {Object.keys(errors).length > 0 && (
            <div className="mb-4 rounded-[12px] bg-red-100 p-4 text-red-700">
              <ul className="list-disc pl-5">
                {Object.values(errors).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-bold text-gray-700">
                サイト名
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={handleChange}
                className="w-full rounded-[12px] border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="url" className="block font-bold text-gray-700">
                URL
              </label>
              <input
                type="url"
                id="url"
                name="url"
                value={data.url}
                onChange={handleChange}
                className="w-full rounded-[12px] border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              {/* 戻るボタンが必要な場合はコメントアウトを解除 */}
              {/* <Link
                            href={route(window.history.length > 1 ? window.history.back() : 'bookmark.index')}
                            className="flex items-center justify-center w-10 h-10 text-gray-500 rounded-full transition-colors duration-200 hover:bg-gray-200 hover:cursor-pointer"
                            dangerouslySetInnerHTML={{ __html: icons.undo }}
                        /> */}
              <button
                type="submit"
                className="rounded-[12px] bg-blue-600 px-6 py-3 text-white hover:bg-blue-500"
                disabled={processing}
              >
                追加
              </button>
            </div>
          </form>
        </div>

        {/* BookmarkIndex を囲む div で幅を調整 */}
        <div className="mx-auto max-w-3xl">
          <BookmarkIndex bookmarks={bookmarks} />
        </div>
      </div>
    </AppLayout>
  );
}
