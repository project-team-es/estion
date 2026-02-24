import { AppLayout } from '@/Layouts/AppLayout';
import { usePage } from '@inertiajs/react';
import EntrysheetList from './EntrysheetList';
import EntrysheetActionButtons from './EntrysheetActionbuttons';
import { Head, router } from '@inertiajs/react';

export default function Entrysheet() {
  const { entrysheets } = usePage().props;

  const handleDelete = (id) => {
    if (!confirm('このエントリーシートを削除しますか？')) return;
    router.delete(route('entrysheet.destroy', id), {
      preserveScroll: true,
    });
  };

  return (
    <AppLayout>
      <Head>
        <title>ES一覧｜estion.</title>
        <meta
          name="description"
          content="estion.のES一覧ページです。登録したエントリーシートの一覧を確認できます。"
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
          <div className="relative overflow-hidden rounded-[12px] bg-white shadow-md">
            <div className="p-6 text-gray-900">
              <EntrysheetActionButtons />
              <h2 className="mt-6 text-xl font-bold">登録したエントリーシート</h2>

              {entrysheets.length === 0 ? (
                <p className="mt-4 text-gray-600">登録されたエントリーシートがありません。</p>
              ) : (
                <EntrysheetList entrysheets={entrysheets} onDelete={handleDelete} />
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
