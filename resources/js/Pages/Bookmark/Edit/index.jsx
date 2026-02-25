import { AppLayout } from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ bookmark }) {
  const { data, setData, put, processing, errors } = useForm({
    name: bookmark.name,
    url: bookmark.url,
  });

  const handleChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('bookmark.update', bookmark.id));
  };

  return (
    <AppLayout>
      <Head>
        <title>ブックマーク編集｜estion.</title>
        <meta
          name="description"
          content="estion.のブックマーク編集ページです。登録したお気に入りURLの名称・URLを編集することができます。"
        />
        <meta name="google-adsense-account" content="ca-pub-9604843985307640" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9604843985307640"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">ブックマーク編集</h2>

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
            <div className="mb-4">
              <label htmlFor="name" className="mb-2 block font-bold text-gray-700">
                サイト名
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

            <div className="mb-4">
              <label htmlFor="url" className="mb-2 block font-bold text-gray-700">
                URL
              </label>
              <input
                type="url"
                name="url"
                id="url"
                value={data.url}
                onChange={handleChange}
                className="w-full rounded-[12px] border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex items-center justify-end gap-4">
              <Link
                href={route('bookmark.create')}
                className="text-gray-500 hover:text-gray-700"
              >
                戻る
              </Link>
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
